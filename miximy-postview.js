
import { initializeApp } from &quot;https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js&quot;;
import { getDatabase, ref, onValue, runTransaction } from &quot;https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js&quot;;
// 🔹 Firebase Config
const firebaseConfig = {
  apiKey: &quot;AIzaSyCFIQsTVn0NVwRf0Bi1n0M6xx4W-dVTyck&quot;,
  authDomain: &quot;test-projects-toolsax.firebaseapp.com&quot;,
  databaseURL: &quot;https://test-projects-toolsax-default-rtdb.firebaseio.com&quot;,
  projectId: &quot;test-projects-toolsax&quot;,
  storageBucket: &quot;test-projects-toolsax.firebasestorage.app&quot;,
  messagingSenderId: &quot;413491512487&quot;,
  appId: &quot;1:413491512487:web:76883acdde130e81560782&quot;,
  measurementId: &quot;G-GSMSBCHLDG&quot; };
// 🔹 Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 🔹 Function to show temporary message (optional)
function showMessage(msg) {
  let box = document.getElementById(&quot;message-box&quot;);
  if (!box) {
    box = document.createElement(&quot;div&quot;);
    box.id = &quot;message-box&quot;;
    box.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #222;
    color: #fff;
    padding: 10px 20px;
    border-radius: 8px;
    opacity: 0;
    transition: opacity 0.3s;
    z-index: 9999; `;
    document.body.appendChild(box); }
  box.textContent = msg;
  box.style.opacity = &quot;1&quot;;
  setTimeout(() =&gt; (box.style.opacity = &quot;0&quot;), 3000); }
// 🔹 Initialize Counters
function initializeCounters() {
  const urlPath = location.pathname.replace(/\W+/g, &quot;_&quot;); // প&#2507;স&#2509;ট URL থ&#2503;ক&#2503; ইউন&#2495;ক আইড&#2495;
  const fileRef = ref(db, &quot;file_stats/&quot; + urlPath);
  const viewDiv = document.getElementById(&quot;view-count&quot;);
  const dlDiv = document.getElementById(&quot;download-count&quot;);
  const btn = document.getElementById(&quot;download-btn&quot;);
  if (!viewDiv || !dlDiv) return;
  // 🔸 View count increase
  runTransaction(ref(db, &quot;file_stats/&quot; + urlPath + &quot;/views&quot;), v =&gt; (v || 0) + 1);
  // 🔸 Real-time update
  onValue(fileRef, snap =&gt; {
    const data = snap.val() || {};
    viewDiv.textContent = data.views || 0;
    dlDiv.textContent = data.downloads || 0; });
  // 🔸 Download button click
  if (btn) {
    btn.addEventListener(&quot;click&quot;, () =&gt; {
      runTransaction(ref(db, &quot;file_stats/&quot; + urlPath + &quot;/downloads&quot;), v =&gt; (v || 0) + 1);
      showMessage(&quot;Download started!&quot;);  }); } }

document.addEventListener(&quot;DOMContentLoaded&quot;, initializeCounters);

