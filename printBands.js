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
        `^DI${String.fromCharCode(data.mobile.length)}\x00${data.mobile}`
      );
      device.write("^ONtime\x00");
      device.write(
        `^DI${String.fromCharCode(data.time.length)}\x00${data.time}`
      );
      device.write("^ONqr\x00");
      device.write(`^DI${String.fromCharCode(data.qr.length)}\x00${data.qr}`);
      device.write("^ID");
      device.write("^FF");
    });
  } catch (e) {
    console.error(e.message);
  }
};
