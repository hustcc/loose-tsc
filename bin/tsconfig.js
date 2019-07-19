const ts = require('typescript');

// refer: https://github.com/cspotcode/typescript-transpile-only/blob/master/src/tsc-transpile-only.ts

const parseCommandLineArgs = () => {
  const commandLine = ts.sys.args;

  const tempCompilerHost = ts.createCompilerHost({});
  return ts.parseCommandLine(commandLine, tempCompilerHost.readFile);
};

const parseConfigHostFromCompilerHost = (host) => {
  return {
    fileExists: (f) => host.fileExists(f),
    readDirectory: (root, extensions, includes, depth) => (host.readDirectory ? host.readDirectory(root, extensions, includes, depth) : []),
    readFile: (f) => host.readFile(f),
    useCaseSensitiveFileNames: host.useCaseSensitiveFileNames(),
    getCurrentDirectory: () => host.getCurrentDirectory(),
    onUnRecoverableConfigFileDiagnostic: () => undefined,
  };
};

const handleDiagnostics = (...args) => {
  console.warn(args);
};

const parseTsConfig = () => {
  const parsedCommandLine = parseCommandLineArgs();

  const host = ts.createCompilerHost(parsedCommandLine.options, false);
  const configParsingHost = parseConfigHostFromCompilerHost(host);

  const configFilePath = ts.findConfigFile(parsedCommandLine.options.project || configParsingHost.getCurrentDirectory(), configParsingHost.fileExists, parsedCommandLine.options.project);
  let parsedConfig = parsedCommandLine;
  if (configFilePath) {
    parsedConfig = ts.getParsedCommandLineOfConfigFile(configFilePath, parsedCommandLine.options, {
      ...configParsingHost,
      onUnRecoverableConfigFileDiagnostic(d) {
        handleDiagnostics([ d ], host, parsedCommandLine);
      },
    });
  }
  return parsedConfig;
};

module.exports = parseTsConfig;
