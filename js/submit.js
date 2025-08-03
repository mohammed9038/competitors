async function uploadAndSubmit() {
  const btn = document.getElementById('submit');
  
  // Enhanced loading state
  btn.classList.add('loading-state');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Submitting...';
  btn.disabled = true;

  const address = document.getElementById('address').value.trim();
  const date = document.getElementById('date').value;
  const salesRep = document.getElementById('salesRep').value;
  const entriesEl = document.getElementById('entries');

  const entries = await Promise.all(Array.from(entriesEl.children).map(async (entry, idx) => {
    const files = entry.querySelector('input[name="images"]').files;
    const imageUrls = await uploadImagesToHostinger(files);

    return {
      classification: entry.querySelector('select[name="classification"]').value,
      supplier: entry.querySelector('select[name="supplier"]').value,
      brand: entry.querySelector('select[name="brand"]').value,
      compBrand: entry.querySelector('select[name="compBrand"]').value,
      productName: entry.querySelector('input[name="productName"]').value,
      productSize: entry.querySelector('input[name="productSize"]').value,
      activity: entry.querySelector('select[name="activity"]').value,
      price: entry.querySelector('input[name="price"]').value,
      promo: entry.querySelector('input[name="promo"]').value,
      visibility: entry.querySelector('select[name="visibility"]').value,
      facing: entry.querySelector('input[name="facing"]').value,
      imageUrls: imageUrls
    };
  }));

  const payload = {
    address,
    date,
    salesRep,
    entries
  };

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbzfSWHROQG2Hx_FJtEMvnHtFgMjV8CG6ZfE5hUJ7e8HqJEOHDCzGlZ-i8Pauaj1yN7c/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "data=" + encodeURIComponent(JSON.stringify(payload))
    });

    if (!response.ok) {
      throw new Error(`Submit failed: ${response.status} ${response.statusText}`);
    }

    // Success feedback
    showNotification("✅ Data submitted successfully!", "success");
    resetForm();
  } catch (error) {
    console.error('Submit error:', error);
    showNotification(`❌ Failed to submit data: ${error.message}`, 'error');
  }
  
  // Reset button state
  btn.classList.remove('loading-state');
  btn.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Submit Data';
  btn.disabled = false;
}

async function uploadImagesToHostinger(files) {
  const formData = new FormData();
  Array.from(files).forEach((file, i) => {
    formData.append(`image${i}`, file);
  });

  try {
    const res = await fetch("https://www.mkalrawi.com/Competitors/upload.php", {
      method: "POST",
      body: formData
    });

    if (!res.ok) {
      throw new Error(`Upload failed: ${res.status} ${res.statusText}`);
    }

    return await res.json(); // returns array of image URLs
  } catch (error) {
    console.error('Upload error:', error);
    showNotification(`Upload failed: ${error.message}`, 'error');
    return []; // Return empty array as fallback
  }
}

function resetForm() {
  document.getElementById("address").value = "";
  document.getElementById("date").value = new Date().toISOString().split('T')[0];
  document.getElementById("salesRep").value = "";
  document.getElementById("entries").innerHTML = "";

  // Add back one blank entry if supported
  if (typeof addEntry === "function") {
    addEntry();
  }
}

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `alert alert-${type === 'error' ? 'danger' : type === 'success' ? 'success' : 'info'} alert-dismissible fade show position-fixed`;
  notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
  notification.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  document.body.appendChild(notification);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification && notification.parentNode) {
      notification.remove();
    }
  }, 5000);
}
