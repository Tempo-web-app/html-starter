const TEMPO_API =
    "https://script.google.com/macros/s/AKfycbzHIO3PeuWZfLWxWBUIaoaTi3YRFH-3oDcjCT5l77TBiC0vT1e-WCTqxlcYzxYeJUdK/exec";


/* =========================================
   TEMPO API
========================================= */

async function tempoGet(action, userId) {

    const url =
        TEMPO_API +
        "?action=" +
        encodeURIComponent(action) +
        "&userId=" +
        encodeURIComponent(userId);

    const response =
        await fetch(url);

    if (!response.ok) {
        throw new Error(
            "Tempo API request failed."
        );
    }

    const result =
        await response.json();

    if (!result.success) {
        throw new Error(
            result.error ||
            "Unknown Tempo API error."
        );
    }

    return result.data;
}


async function tempoPost(data) {

    const response =
        await fetch(TEMPO_API, {

            method: "POST",

            headers: {
                "Content-Type":
                    "text/plain;charset=utf-8"
            },

            body:
                JSON.stringify(data)

        });

    if (!response.ok) {
        throw new Error(
            "Tempo API request failed."
        );
    }

    const result =
        await response.json();

    if (!result.success) {
        throw new Error(
            result.error ||
            "Unknown Tempo API error."
        );
    }

    return result.data;
}


/* =========================================
   USER
========================================= */

async function tempoCreateUser(
    name,
    email,
    grade
) {

    return tempoPost({

        action: "createUser",

        name: name,

        email: email,

        grade: grade

    });

}


/* =========================================
   TASKS
========================================= */

async function tempoGetTasks(userId) {

    return tempoGet(
        "getTasks",
        userId
    );

}


async function tempoCreateTask(task) {

    return tempoPost({

        action: "createTask",

        userId:
            task.userId,

        title:
            task.title,

        subject:
            task.subject || "",

        deadline:
            task.deadline || "",

        difficulty:
            task.difficulty || "",

        estimatedMinutes:
            task.estimatedMinutes || 0

    });

}


async function tempoUpdateTask(task) {

    return tempoPost({

        action: "updateTask",

        userId:
            task.userId,

        taskId:
            task.taskId,

        title:
            task.title,

        subject:
            task.subject,

        deadline:
            task.deadline,

        difficulty:
            task.difficulty,

        estimatedMinutes:
            task.estimatedMinutes,

        completed:
            task.completed

    });

}


async function tempoDeleteTask(
    userId,
    taskId
) {

    return tempoPost({

        action: "deleteTask",

        userId: userId,

        taskId: taskId

    });

}


/* =========================================
   TESTS
========================================= */

async function tempoGetTests(userId) {

    return tempoGet(
        "getTests",
        userId
    );

}


async function tempoCreateTest(test) {

    return tempoPost({

        action: "createTest",

        userId:
            test.userId,

        subject:
            test.subject,

        title:
            test.title,

        date:
            test.date,

        difficulty:
            test.difficulty || "",

        topics:
            test.topics || ""

    });

}


/* =========================================
   STUDY SESSIONS
========================================= */

async function tempoCreateSession(session) {

    return tempoPost({

        action: "createSession",

        userId:
            session.userId,

        taskId:
            session.taskId || "",

        durationMinutes:
            session.durationMinutes,

        startedAt:
            session.startedAt ||
            new Date().toISOString(),

        completed:
            session.completed !== false

    });

}


async function tempoGetSessions(userId) {

    return tempoGet(
        "getSessions",
        userId
    );

}


/* =========================================
   SCHEDULE
========================================= */

async function tempoGetSchedule(userId) {

    return tempoGet(
        "getSchedule",
        userId
    );

}


async function tempoCreateSchedule(item) {

    return tempoPost({

        action: "createSchedule",

        userId:
            item.userId,

        title:
            item.title,

        type:
            item.type || "personal",

        startTime:
            item.startTime,

        endTime:
            item.endTime,

        recurring:
            item.recurring || ""

    });

}


/* =========================================
   DASHBOARD
========================================= */

async function tempoGetDashboard(userId) {

    return tempoGet(
        "getDashboard",
        userId
    );

}