function doPost(e) {
  const folder = DriveApp.getFolderById('1dPDt-M-FkzCQwFcESovLit6-466FuGd0');
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Data');

  const payload = JSON.parse(e.parameter.data);
  const address = payload.address;
  const date = payload.date;
  const salesRep = payload.salesRep;
  const entries = payload.entries;
  const blobs = e.files || {};

  entries.forEach((entry, entryIdx) => {
    const imageLinks = [];

    for (let i = 0; i < entry.imageCount; i++) {
      const key = `image_${entryIdx}_${i}`;
      const blob = blobs[key];
      if (blob) {
        const file = folder.createFile(blob);
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        imageLinks.push(file.getUrl());
      }
    }

    const row = [
      address,
      date,
      salesRep,
      entry.classification,
      entry.supplier,
      entry.brand,
      entry.compBrand,
      entry.productName,
      entry.productSize,
      entry.actCat,
      entry.activity,
      entry.price,
      entry.promo,
      entry.visibility,
      entry.facing,
      entry.compFacing,
      imageLinks.join(', ')
    ];

    sheet.appendRow(row);
  });

  return ContentService.createTextOutput("Success");
}
