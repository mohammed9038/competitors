async function uploadAndSubmit() {
  const btn = document.getElementById('submit');
  btn.disabled = true;
  btn.innerText = "Submitting...";

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
      compFacing: entry.querySelector('input[name="compFacing"]').value,
      imageUrls: imageUrls
    };
  }));

  const payload = {
    address,
    date,
    salesRep,
    entries
  };

  await fetch("https://script.google.com/macros/s/AKfycbzfSWHROQG2Hx_FJtEMvnHtFgMjV8CG6ZfE5hUJ7e8HqJEOHDCzGlZ-i8Pauaj1yN7c/exec", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "data=" + encodeURIComponent(JSON.stringify(payload))
  });

  alert("✅ Submitted successfully!");
  resetForm();
  btn.disabled = false;
  btn.innerText = "Submit";
}

async function uploadImagesToHostinger(files) {
  const formData = new FormData();
  Array.from(files).forEach((file, i) => {
    formData.append(`image${i}`, file);
  });

  const res = await fetch("https://www.mkalrawi.com/Competitors/upload.php", {
    method: "POST",
    body: formData
  });

  return await res.json(); // returns array of image URLs
}

function resetForm() {
  document.getElementById("address").value = "";
  document.getElementById("date").value = "";
  document.getElementById("salesRep").value = "";
  document.getElementById("entries").innerHTML = "";

  // Add back one blank entry if supported
  if (typeof addEntry === "function") {
    addEntry();
  }
}
