const ts = require('typescript');

// code here: https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API#a-minimal-compiler

const compile = (fileNames, options) => {
  const program = ts.createProgram(fileNames, options);
  const emitResult = program.emit();

  const allDiagnostics = []
    // .concat(ts.getPreEmitDiagnostics(program))
    .concat(emitResult.diagnostics);

  allDiagnostics.forEach((diagnostic) => {
    if (diagnostic.file) {
      const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
      const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
      // eslint-disable-next-line
      console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
    } else {
      // eslint-disable-next-line
      console.log(`${ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')}`);
    }
  });

  const exitCode = emitResult.emitSkipped ? 1 : 0;
  // eslint-disable-next-line
  console.log(`Process exiting with code '${exitCode}'.`);
  process.exit(exitCode);
};

module.exports = compile;
