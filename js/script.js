let currentPage = window.location.pathname;

if (currentPage.includes("treehole.html")) {
    alert("欢迎来到JY树洞");

    const supabaseUrl = "https://bobjcgridizyzxrpivis.supabase.co";
    const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvYmpjZ3JpZGl6eXp4cnBpdmlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkwMzExMjYsImV4cCI6MjEwNDYwNzEyNn0.HUCUWac9mrEHG-mISjbCAAWwgDlcTF1D8gb0oo2aJiI";
    // 修复重名问题！客户端实例改名叫 sb
    const { createClient } = supabase;
    const sb = createClient(supabaseUrl, supabaseAnonKey);

    const submitBtn = document.getElementById("submitMsgBtn");
    const msgInput = document.getElementById("msgInput");
    const msgListDom = document.getElementById("msgList");

    async function renderMessages() {
        msgListDom.innerHTML = "";
        const { data, error } = await sb
            .from("messages")
            .select("content, created_at")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("读取留言失败：", error);
            return;
        }
        if (!data) return;

        data.forEach(function (item) {
            const newMsg = document.createElement("div");
            newMsg.className = "msg-item";
            newMsg.innerText = `${item.content}\n【${new Date(item.created_at).toLocaleString()}】`;
            msgListDom.appendChild(newMsg);
        })
    }

    renderMessages();

    submitBtn.addEventListener("click", async function () {
        const text = msgInput.value.trim();
        if (text !== "") {
            const { error } = await sb
                .from("messages")
                .insert([{ content: text }]);

            if (error) {
                alert("提交失败！");
                console.error(error);
                return;
            }
            msgInput.value = "";
            renderMessages();
        } else {
            alert("留言不能为空哦");
        }
    })

    msgInput.addEventListener("keydown", async function (e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submitBtn.click();
        }
    })
}

// Prevent multiple submissions
let isSubmitting = false;
submitBtn.addEventListener("click", async function () {
    if(isSubmitting) return;
    const text = msgInput.value.trim();
    if (text === "") {
        alert("留言不能为空哦");
        return;
    }
    isSubmitting = true;
    const { error } = await sb.from("messages").insert([{ content: text }]);
    if (error) {
        alert("提交失败！");
        console.error(error);
    } else {
        msgInput.value = "";
        renderMessages();
    }
    isSubmitting = false;
})