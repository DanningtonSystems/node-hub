/**
 * Credit: snesin, Stack Overflow  
 * https://stackoverflow.com/questions/19687407/press-any-key-to-continue-in-nodejs
*/
function keyPress(message, keys) {
    const _message = message || "Press any key to continue...";
    const _keys = keys || "";
    return new Promise(function (resolve, reject) {
      const caseSensitive = _keys.toLowerCase() !== _keys && _keys.toUpperCase() !== _keys;
      process.stdout.write(_message);
      function keyListener(buffer) {
        let key = buffer.toString();
        if (key.charCodeAt(0) === 3) {
          process.stdin.setRawMode(false);
          process.stdin.off('data', keyListener);
          process.stdin.pause();

          reject(key.charCodeAt(0));
        }
        const index = caseSensitive ? _keys.indexOf(key) : _keys.toLowerCase().indexOf(key.toLowerCase());
        if (_keys && index < 0) {
          process.stdout.write(key);
          process.stdout.write("\n");
          process.stdout.write(_message);
          return;
        }
        process.stdin.setRawMode(false);
        process.stdin.off('data', keyListener);
        process.stdin.pause();
        if (index >= 0) {
          key = _keys.charAt(index);
          process.stdout.write(key);
        }
        process.stdout.write("\n");
        resolve(key);
      }
      process.stdin.resume();
      process.stdin.setRawMode(true);
      process.stdin.on('data', keyListener);
    });
}
  
module.exports = keyPress;