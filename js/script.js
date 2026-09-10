// 判断当前访问的页面是不是 treehole.html
const currentPage = window.location.pathname;

// 只有进入树洞页面才执行弹窗(后续留言板功能也在大括号后面写)
if (currentPage.includes("treehole.html")) {
    alert("欢迎来到JY树洞");

   // 1. 定义留言数组，从localStorage读取旧留言
    let msgListData = JSON.parse(localStorage.getItem("treeholeMsg")) || [];

    const submitBtn = document.getElementById("submitMsgBtn");
    const msgInput = document.getElementById("msgInput");
    const msgListDom = document.getElementById("msgList");

    // 函数：渲染所有留言到页面
    function renderMessages() {
        // 先清空页面现有留言
        msgListDom.innerHTML = "";
        // 循环生成每条留言
        msgListData.forEach(function (msgText) {
            const newMsg = document.createElement("div");
            newMsg.className = "msg-item";
            newMsg.innerText = msgText;
            msgListDom.appendChild(newMsg);
        })
    }

    // 页面打开时，立刻渲染已经保存的留言
    renderMessages();

    // 点击提交按钮添加留言
    submitBtn.addEventListener("click", function () {
        const text = msgInput.value.trim();
        if (text !== "") {
            // 新增留言放进数组
            msgListData.push(text);
            // 保存到浏览器本地存储
            localStorage.setItem("treeholeMsg", JSON.stringify(msgListData));
            // 重新渲染页面
            renderMessages();
            // 清空输入框
            msgInput.value = "";
        } else {
            alert("留言不能为空哦");
        }
    })

    // 回车快速提交留言
    msgInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submitBtn.click();
        }
    })
}
