const CATEGORIES = {
    frontend: ["js", "ts", "react", "nextjs"],
    backend:  ["nodejs", "express", "python", "django", "mysql"],
    core:     ["os", "dbms", "networking", "oops"],
    dsa:      ["dsa"],
};

const VALID_TOPICS = new Set(Object.values(CATEGORIES).flat());

module.exports = { CATEGORIES, VALID_TOPICS };
