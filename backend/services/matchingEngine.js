import { normalizeSkill } from "../utils/normalizeSkill.js";

const SCORE_WEIGHTS = {
  skills: 0.4,
  experience: 0.25,
  responsibilities: 0.15,
  education: 0.1,
  semantic: 0.1,
};

export const calculateMatch = (resumeData, jobData) => {
  const requiredJobSkills = (jobData.requiredSkills || []).concat(
    jobData.technologies || [],
  );
  const preferredJobSkills = jobData.preferredSkills || [];

  const resumeSkills = new Set(
    [
      ...(resumeData.skills || []),
      ...(resumeData.technicalSkills || []),
      ...(resumeData.softSkills || []),
    ].map(normalizeSkill),
  );

  const matchedSkills = [];
  const missingSkills = [];
  const matchedPreferred = [];

  requiredJobSkills.forEach((skill) => {
    if (resumeSkills.has(normalizeSkill(skill))) {
      matchedSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  });

  preferredJobSkills.forEach((skill) => {
    if (resumeSkills.has(normalizeSkill(skill))) {
      matchedPreferred.push(skill);
    }
  });

  let skillsScore = 0;
  if (requiredJobSkills.length > 0) {
    skillsScore = (matchedSkills.length / requiredJobSkills.length) * 100;
  } else {
    skillsScore = 100;
  }

  if (preferredJobSkills.length > 0 && matchedPreferred.length > 0) {
    skillsScore += (matchedPreferred.length / preferredJobSkills.length) * 10;
    skillsScore = Math.min(skillsScore, 100);
  }

  const requiredExp = jobData.requiredExperienceYears || 0;
  const candidateExp = resumeData.totalExperienceYears || 0;
  let experienceScore = 0;

  if (requiredExp === 0 || candidateExp >= requiredExp) {
    experienceScore = 100;
  } else {
    experienceScore = (candidateExp / requiredExp) * 100;
  }

  const experienceMatch = {
    requiredYears: requiredExp,
    candidateYears: candidateExp,
    matched: candidateExp >= requiredExp,
    percentage: Math.round(experienceScore),
  };

  const responsibilities = jobData.responsibilities || [];
  let respScore = 100;
  const matchedResponsibilities = [];
  const missingResponsibilities = [];

  if (responsibilities.length > 0) {
    const expText = (resumeData.experience || [])
      .map((e) => e.description)
      .join(" ")
      .toLowerCase();

    responsibilities.forEach((resp) => {
      const words = resp
        .toLowerCase()
        .split(/\s+/)
        .filter((w) => w.length > 4);
      let matchCount = 0;
      words.forEach((w) => {
        if (expText.includes(w)) matchCount++;
      });

      if (matchCount >= Math.min(2, words.length)) {
        matchedResponsibilities.push(resp);
      } else {
        missingResponsibilities.push(resp);
      }
    });

    respScore =
      (matchedResponsibilities.length / responsibilities.length) * 100;
  }

  const requiredEdu = jobData.educationRequirements || [];
  const candidateEduText = (resumeData.education || [])
    .map((e) => e.degree + " " + e.institution)
    .join(" ")
    .toLowerCase();
  let educationScore = 100;

  if (requiredEdu.length > 0) {
    let eduMatched = false;
    requiredEdu.forEach((edu) => {
      const degreeTypes = [
        "bachelor",
        "master",
        "phd",
        "b.s",
        "m.s",
        "b.a",
        "m.a",
      ];
      degreeTypes.forEach((dt) => {
        if (edu.toLowerCase().includes(dt) && candidateEduText.includes(dt)) {
          eduMatched = true;
        }
      });
    });

    educationScore = eduMatched ? 100 : 50;
  }
  const educationMatch = { score: educationScore };

  const semanticScore = 80;

  const breakdown = {
    skills: Math.round(skillsScore),
    experience: Math.round(experienceScore),
    responsibilities: Math.round(respScore),
    education: Math.round(educationScore),
    semantic: Math.round(semanticScore),
  };

  const finalScore = Math.round(
    breakdown.skills * SCORE_WEIGHTS.skills +
      breakdown.experience * SCORE_WEIGHTS.experience +
      breakdown.responsibilities * SCORE_WEIGHTS.responsibilities +
      breakdown.education * SCORE_WEIGHTS.education +
      breakdown.semantic * SCORE_WEIGHTS.semantic,
  );

  return {
    score: finalScore,
    breakdown,
    matchedSkills,
    missingSkills,
    preferredSkillsMatched: matchedPreferred,
    matchedResponsibilities,
    missingResponsibilities,
    experienceMatch,
    educationMatch,
  };
};
