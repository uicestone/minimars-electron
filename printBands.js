const Usb = require("escpos-usb");

module.exports = async function (data, copy = 1) {
  console.log(`Print ${copy} band(s):`, data);

  try {
    const device = new Usb();
    device.open(function (error) {
      device.write("\x1Bia\x03"); // switch mode
      device.write("^II");
      device.write("^ONdata1\x00");
      device.write(`^DI\x0B\x00${data.data1}`);
      device.write("^ONdata2\x00");
      device.write(`^DI\x10\x00${data.data2}`);
      device.write("^ONqr\x00");
      device.write(`^DI\x0B\x00${data.qr}`);
      device.write("^ID");
      device.write("^FF");
    });
  } catch (e) {
    console.error(e.message);
  }
};
