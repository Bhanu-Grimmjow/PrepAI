const TOPIC_LABELS = {
    js: "JavaScript",
    ts: "TypeScript",
    react: "React",
    nextjs: "Next.js",
    nodejs: "Node.js",
    express: "Express",
    python: "Python",
    django: "Django",
    mysql: "MySQL",
    os: "Operating Systems",
    dbms: "Database Management Systems",
    networking: "Computer Networking",
    oops: "Object-Oriented Programming",
    dsa: "Data Structures and Algorithms",
};

export function formatTopic(topic) {
    const key = String(topic || "").toLowerCase();

    return TOPIC_LABELS[key] ||
        key.replace(/[_-]+/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}