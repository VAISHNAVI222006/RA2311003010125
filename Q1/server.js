const express = require('express');

const app = express();
const PORT = 5000;

// Home route
app.get('/', (req, res) => {
    res.send("Vehicle Scheduler Running ✅");
});

// Schedule route
app.get('/schedule', (req, res) => {

    const capacity = 60;

    const tasks = [
        { TaskID: 1, Duration: 10, Impact: 60 },
        { TaskID: 2, Duration: 20, Impact: 100 },
        { TaskID: 3, Duration: 30, Impact: 120 },
        { TaskID: 4, Duration: 25, Impact: 90 },
        { TaskID: 5, Duration: 15, Impact: 70 }
    ];

    function knapsack(tasks, capacity) {
        const n = tasks.length;
        const dp = Array(n + 1).fill().map(() => Array(capacity + 1).fill(0));

        for (let i = 1; i <= n; i++) {
            const { Duration, Impact } = tasks[i - 1];

            for (let w = 0; w <= capacity; w++) {
                if (Duration <= w) {
                    dp[i][w] = Math.max(
                        dp[i - 1][w],
                        dp[i - 1][w - Duration] + Impact
                    );
                } else {
                    dp[i][w] = dp[i - 1][w];
                }
            }
        }

        let w = capacity;
        const selected = [];

        for (let i = n; i > 0; i--) {
            if (dp[i][w] !== dp[i - 1][w]) {
                selected.push(tasks[i - 1]);
                w -= tasks[i - 1].Duration;
            }
        }

        return {
            totalImpact: dp[n][capacity],
            selectedTasks: selected.reverse()
        };
    }

    const result = knapsack(tasks, capacity);

    res.json({
        message: "Schedule generated ✅",
        capacity,
        totalImpact: result.totalImpact,
        selectedTasks: result.selectedTasks
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
