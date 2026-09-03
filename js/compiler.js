/* ===================================
   PREPVANTA COMPILER SCRIPT
=================================== */

const langSelect = document.getElementById("langSelect");
const codeArea = document.getElementById("codeArea");
const consoleArea = document.getElementById("consoleArea");
const runBtn = document.getElementById("runBtn");

const samples = {
    javascript: `function fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}\n\nfor (let i = 0; i < 8; i++) {\n  console.log(fibonacci(i));\n}`,
    python: `def fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n - 1) + fibonacci(n - 2)\n\nfor i in range(8):\n    print(fibonacci(i))`,
    java: `public class Main {\n    static int fibonacci(int n) {\n        if (n <= 1) return n;\n        return fibonacci(n - 1) + fibonacci(n - 2);\n    }\n    public static void main(String[] args) {\n        for (int i = 0; i < 8; i++) {\n            System.out.println(fibonacci(i));\n        }\n    }\n}`,
    c: `#include <stdio.h>\n\nint fibonacci(int n) {\n    if (n <= 1) return n;\n    return fibonacci(n - 1) + fibonacci(n - 2);\n}\n\nint main() {\n    for (int i = 0; i < 8; i++) {\n        printf("%d\\n", fibonacci(i));\n    }\n    return 0;\n}`,
    cpp: `#include <iostream>\nusing namespace std;\n\nint fibonacci(int n) {\n    if (n <= 1) return n;\n    return fibonacci(n - 1) + fibonacci(n - 2);\n}\n\nint main() {\n    for (int i = 0; i < 8; i++) cout << fibonacci(i) << endl;\n    return 0;\n}`,
    sql: `SELECT student_name, score\nFROM mock_test_results\nWHERE score >= 80\nORDER BY score DESC;`
};

function loadSample(lang) {
    codeArea.value = samples[lang] || "// start typing...";
}

if (langSelect) {
    loadSample(langSelect.value);
    langSelect.addEventListener("change", () => loadSample(langSelect.value));
}

function printLine(text, cls) {
    const span = document.createElement("div");
    if (cls) span.className = cls;
    span.textContent = text;
    consoleArea.appendChild(span);
}

if (runBtn) {
    runBtn.addEventListener("click", () => {

        consoleArea.innerHTML = "";
        const lang = langSelect.value;

        printLine(`▶ Running ${langSelect.options[langSelect.selectedIndex].text}...`, "muted");

        if (lang === "javascript") {
            const logs = [];
            const originalLog = console.log;
            console.log = (...args) => logs.push(args.join(" "));
            try {
                new Function(codeArea.value)();
                logs.forEach(l => printLine(l, "ok"));
                printLine("\nProcess finished with exit code 0", "muted");
            } catch (err) {
                printLine(String(err), "err");
            } finally {
                console.log = originalLog;
            }
            return;
        }

        setTimeout(() => {
            if (lang === "sql") {
                printLine("student_name | score", "ok");
                printLine("-------------------", "muted");
                printLine("Riya Sharma   | 96", "ok");
                printLine("Aman Verma    | 88", "ok");
            } else {
                printLine("0\n1\n1\n2\n3\n5\n8\n13", "ok");
                printLine("\nProcess finished with exit code 0", "muted");
                printLine("(simulated — connect a code-execution API for real compilation)", "muted");
            }
        }, 400);
    });
}
