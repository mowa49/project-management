module.exports = {
    apps: [
        {
            name:"projec-management",
            script: "npm",
            args: "run dev",
            env: {
                NODE_ENV : "development"
            }
        }
    ]
}