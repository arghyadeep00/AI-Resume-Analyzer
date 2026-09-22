export const normalizeSkill = (skill) => {
  if (!skill) return "";

  let normalized = skill.toLowerCase().trim();

  const aliases = {
    // =========================
    // JavaScript / TypeScript
    // =========================
    js: "javascript",
    jscript: "javascript",
    ecmascript: "javascript",
    es6: "javascript",
    es2015: "javascript",
    ts: "typescript",
    tsx: "typescript",
    jsx: "javascript",

    // =========================
    // React
    // =========================
    react: "react.js",
    reactjs: "react.js",
    "react js": "react.js",
    "react.js": "react.js",

    // =========================
    // Node.js
    // =========================
    node: "node.js",
    nodejs: "node.js",
    "node js": "node.js",
    "node.js": "node.js",

    // =========================
    // Vue
    // =========================
    vue: "vue.js",
    vuejs: "vue.js",
    "vue js": "vue.js",
    "vue.js": "vue.js",

    // =========================
    // Angular
    // =========================
    angular: "angular",
    angularjs: "angular",
    "angular js": "angular",
    ng: "angular",

    // =========================
    // Frontend Frameworks
    // =========================
    next: "next.js",
    nextjs: "next.js",
    "next js": "next.js",
    "next.js": "next.js",

    nuxt: "nuxt.js",
    nuxtjs: "nuxt.js",
    "nuxt js": "nuxt.js",

    svelte: "svelte",
    sveltejs: "svelte",

    // =========================
    // CSS / UI
    // =========================
    css3: "css",
    html5: "html",
    tailwind: "tailwind css",
    tailwindcss: "tailwind css",
    "tailwind css": "tailwind css",
    bootstrap: "bootstrap",
    "material ui": "material ui",
    mui: "material ui",
    chakra: "chakra ui",
    "chakra-ui": "chakra ui",

    // =========================
    // Backend / Node Ecosystem
    // =========================
    express: "express.js",
    expressjs: "express.js",
    "express js": "express.js",

    nest: "nestjs",
    "nest.js": "nestjs",
    nestjs: "nestjs",

    fastify: "fastify",

    // =========================
    // Python
    // =========================
    py: "python",
    python3: "python",
    "python 3": "python",

    django: "django",
    drf: "django rest framework",
    "django rest": "django rest framework",

    flask: "flask",
    "fast api": "fastapi",
    "fast-api": "fastapi",
    fastapi: "fastapi",

    // =========================
    // Java
    // =========================
    java: "java",
    jdk: "java",
    j2ee: "java",
    "jakarta ee": "java ee",
    "java ee": "java ee",

    spring: "spring",
    "spring boot": "spring boot",
    springboot: "spring boot",
    "spring mvc": "spring mvc",

    // =========================
    // C / C++
    // =========================
    "c plus plus": "cpp",
    "c++": "cpp",
    cpp: "cpp",

    "c sharp": "csharp",
    "c#": "csharp",
    "c-sharp": "csharp",

    // =========================
    // .NET
    // =========================
    ".net": "dotnet",
    "dot net": "dotnet",
    dotnet: "dotnet",
    "asp.net": "asp.net",
    "asp net": "asp.net",
    aspnet: "asp.net",
    "asp.net core": "asp.net core",
    "dotnet core": ".net core",
    ".net core": ".net core",

    // =========================
    // PHP
    // =========================
    php: "php",
    "php 8": "php",

    laravel: "laravel",
    "laravel framework": "laravel",

    symfony: "symfony",

    // =========================
    // Ruby
    // =========================
    ruby: "ruby",
    "ruby on rails": "ruby on rails",
    rails: "ruby on rails",
    ror: "ruby on rails",

    // =========================
    // Go
    // =========================
    golang: "go",
    "go lang": "go",

    // =========================
    // Rust
    // =========================
    rustlang: "rust",
    "rust lang": "rust",

    // =========================
    // Databases - SQL
    // =========================
    mysql: "mysql",
    "my sql": "mysql",

    postgres: "postgresql",
    postgresql: "postgresql",
    "postgre sql": "postgresql",

    mssql: "sql server",
    "ms sql": "sql server",
    sqlserver: "sql server",
    "sql server": "sql server",

    "oracle db": "oracle",
    "oracle database": "oracle",

    // =========================
    // NoSQL
    // =========================
    mongo: "mongodb",
    mongodb: "mongodb",
    "mongo db": "mongodb",

    dynamo: "amazon dynamodb",
    dynamodb: "amazon dynamodb",
    "dynamo db": "amazon dynamodb",

    "cassandra db": "cassandra",

    redis: "redis",

    firebase: "firebase",
    firestore: "firebase firestore",
    "firebase firestore": "firebase firestore",

    // =========================
    // Cloud - AWS
    // =========================
    aws: "amazon web services",
    "amazon aws": "amazon web services",
    "amazon web services": "amazon web services",

    ec2: "amazon ec2",
    "aws ec2": "amazon ec2",

    s3: "amazon s3",
    "aws s3": "amazon s3",

    rds: "amazon rds",
    "aws rds": "amazon rds",

    lambda: "aws lambda",
    "aws lambda": "aws lambda",

    cloudfront: "amazon cloudfront",
    route53: "amazon route 53",
    "route 53": "amazon route 53",

    // =========================
    // Cloud - Azure
    // =========================
    azure: "microsoft azure",
    "ms azure": "microsoft azure",
    "microsoft azure": "microsoft azure",

    "azure vm": "azure virtual machines",
    "azure devops": "azure devops",

    // =========================
    // Cloud - Google
    // =========================
    gcp: "google cloud platform",
    "google cloud": "google cloud platform",
    "google cloud platform": "google cloud platform",

    gce: "google compute engine",
    "google compute engine": "google compute engine",

    gcs: "google cloud storage",
    "cloud storage": "google cloud storage",

    // =========================
    // Containers
    // =========================
    docker: "docker",
    "docker container": "docker",

    "docker compose": "docker compose",
    "docker-compose": "docker compose",

    k8s: "kubernetes",
    kube: "kubernetes",
    kubernetes: "kubernetes",

    helm: "helm",

    // =========================
    // DevOps / CI-CD
    // =========================
    "ci/cd": "ci/cd",
    "ci cd": "ci/cd",
    cicd: "ci/cd",

    "github actions": "github actions",
    "github action": "github actions",

    "gitlab ci": "gitlab ci",
    "gitlab-ci": "gitlab ci",

    jenkins: "jenkins",

    circleci: "circleci",
    "circle ci": "circleci",

    "travis ci": "travis ci",
    "travis-ci": "travis ci",

    // =========================
    // Infrastructure as Code
    // =========================
    terraform: "terraform",
    tf: "terraform",

    ansible: "ansible",

    pulumi: "pulumi",

    cloudformation: "aws cloudformation",
    "aws cloudformation": "aws cloudformation",

    // =========================
    // Version Control
    // =========================
    git: "git",
    github: "github",
    "git hub": "github",

    gitlab: "gitlab",
    "git lab": "gitlab",

    bitbucket: "bitbucket",

    // =========================
    // Linux / OS
    // =========================
    linux: "linux",
    "ubuntu linux": "ubuntu",
    ubuntu: "ubuntu",
    "centos linux": "centos",
    redhat: "red hat",
    rhel: "red hat",

    // =========================
    // Web Servers
    // =========================
    nginx: "nginx",
    "nginx server": "nginx",

    apache: "apache",
    "apache httpd": "apache",

    // =========================
    // APIs
    // =========================
    rest: "rest api",
    restful: "rest api",
    "rest api": "rest api",
    "restful api": "rest api",

    graphql: "graphql",
    "graph ql": "graphql",

    grpc: "grpc",

    // =========================
    // Testing
    // =========================
    jest: "jest",
    jestjs: "jest",

    mocha: "mocha",
    chai: "chai",

    cypress: "cypress",
    playwright: "playwright",

    selenium: "selenium",
    "selenium webdriver": "selenium",

    // =========================
    // AI / Machine Learning
    // =========================
    ai: "artificial intelligence",
    "artificial intelligence": "artificial intelligence",

    ml: "machine learning",
    "machine learning": "machine learning",

    dl: "deep learning",
    "deep learning": "deep learning",

    nlp: "natural language processing",
    "natural language processing": "natural language processing",

    llm: "large language model",
    "large language model": "large language model",

    "gen ai": "generative ai",
    genai: "generative ai",
    "generative ai": "generative ai",

    tensorflow: "tensorflow",
    tf: "tensorflow",

    pytorch: "pytorch",
    torch: "pytorch",

    keras: "keras",

    // =========================
    // AI APIs / Platforms
    // =========================
    "openai api": "openai",
    "chatgpt api": "openai",
    openai: "openai",

    gemini: "google gemini",
    "gemini api": "google gemini",
    "google gemini": "google gemini",

    claude: "anthropic claude",
    anthropic: "anthropic claude",

    // =========================
    // Message Queues
    // =========================
    "rabbit mq": "rabbitmq",
    rabbitmq: "rabbitmq",

    kafka: "apache kafka",
    "apache kafka": "apache kafka",

    // =========================
    // Mobile
    // =========================
    "react native": "react native",
    reactnative: "react native",

    flutter: "flutter",
    dart: "dart",

    android: "android",
    "android sdk": "android",

    ios: "ios",
    swift: "swift",
    "objective c": "objective-c",
    "objective-c": "objective-c",

    // =========================
    // Data / Analytics
    // =========================
    pandas: "pandas",
    numpy: "numpy",

    "power bi": "power bi",
    powerbi: "power bi",

    tableau: "tableau",

    excel: "microsoft excel",
    "ms excel": "microsoft excel",
    "microsoft excel": "microsoft excel",

    // =========================
    // Package Managers
    // =========================
    npm: "npm",
    "node package manager": "npm",

    yarn: "yarn",
    pnpm: "pnpm",

    pip: "pip",

    maven: "maven",
    mvn: "maven",

    gradle: "gradle",

    // =========================
    // Security
    // =========================
    oauth: "oauth",
    oauth2: "oauth 2.0",
    "oauth 2": "oauth 2.0",
    "oauth 2.0": "oauth 2.0",

    jwt: "json web token",
    "json web token": "json web token",

    sso: "single sign-on",
    "single sign on": "single sign-on",

    ssl: "ssl/tls",
    tls: "ssl/tls",

    // =========================
    // Architecture / Concepts
    // =========================
    oop: "object oriented programming",
    "object oriented programming": "object oriented programming",

    dsa: "data structures and algorithms",
    "data structures algorithms": "data structures and algorithms",

    microservices: "microservices",
    "micro service": "microservices",

    serverless: "serverless",
  };

  if (aliases[normalized]) {
    return aliases[normalized];
  }

  normalized = normalized
    .replace(/[^a-z0-9#\+\-\.]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return normalized;
};
