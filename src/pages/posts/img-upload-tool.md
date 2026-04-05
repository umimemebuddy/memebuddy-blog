---
layout: ../../layouts/Layout.astro
title: 简易图床上传工具
date: 2026-04-05
---

# 简易图床上传工具

<form id="upload-form" style="max-width: 400px; margin: 20px auto; padding: 20px; background: #101010; border: 1px solid #3d3a39; border-radius: 8px;">
  <input type="file" id="file-input" accept="image/*" style="margin-bottom: 15px; padding: 10px; width: 100%; background: #050507; color: #f2f2f2; border: 1px solid #3d3a39; border-radius: 4px;">
  <button type="submit" style="width: 100%; padding: 12px; background: #00d992; color: #050507; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;">上传图片</button>
</form>

<div id="result" style="max-width: 400px; margin: 20px auto; display: none; padding: 15px; background: #101010; border: 1px solid #00d992; border-radius: 8px;">
  <p style="color: #00d992; margin-bottom: 10px;">上传成功!</p>
  <input id="result-url" readonly style="width: 100%; padding: 8px; background: #050507; color: #00d992; border: 1px solid #3d3a39; border-radius: 4px; font-family: monospace;">
  <button onclick="copyUrl()" style="margin-top: 10px; padding: 8px 16px; background: #3d3a39; color: #f2f2f2; border: none; border-radius: 4px; cursor: pointer;">复制链接</button>
</div>

<div id="error" style="max-width: 400px; margin: 20px auto; display: none; padding: 15px; background: rgba(251,86,91,0.1); border: 1px solid #fb565b; border-radius: 8px; color: #fb565b;"></div>

<script>
const form = document.getElementById('upload-form');
const fileInput = document.getElementById('file-input');
const resultDiv = document.getElementById('result');
const resultUrl = document.getElementById('result-url');
const errorDiv = document.getElementById('error');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const file = fileInput.files[0];
  if (!file) {
    showError('请选择图片');
    return;
  }
  
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const res = await fetch('https://img.memebuddy.cc/upload', {
      method: 'POST',
      body: formData
    });
    
    const data = await res.json();
    
    if (data.success) {
      resultUrl.value = data.url;
      resultDiv.style.display = 'block';
      errorDiv.style.display = 'none';
    } else {
      showError(data.error || '上传失败');
    }
  } catch (err) {
    showError(err.message);
  }
});

function showError(msg) {
  errorDiv.textContent = msg;
  errorDiv.style.display = 'block';
  resultDiv.style.display = 'none';
}

function copyUrl() {
  navigator.clipboard.writeText(resultUrl.value);
  alert('已复制!');
}
</script>