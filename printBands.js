const Usb = require("escpos-usb");

module.exports = async function (data, copy = 1) {
  console.log(`Print ${copy} band(s):`, data);

  try {
    const device = new Usb();

    device.open(function (error) {
      device.write("\x1Bia\x03"); // switch mode
      device.write("^II");
      device.write("^ONmobile\x00");
      device.write(
        `^DI${String.fromCharCode(data.data1.length)}\x00${data.data1}`
      );
      device.write("^ONtime\x00");
      device.write(
        `^DI${String.fromCharCode(data.data2.length)}\x00${data.data2}`
      );
      if (data.qr) {
        device.write("^ONqr\x00");
        device.write(`^DI${String.fromCharCode(data.qr.length)}\x00${data.qr}`);
      }
      device.write("^ID");
      device.write("^FF");
    });
  } catch (e) {
    console.error(e.message);
  }
};
