## Telavox Flow Electron Wrapper

Simple electron wrapper for Telavox Flow Softphone, allowing you to access PBX services from Telavox directly from Linux. Made because Telavox Flow works poorly when using Wine and they don't have an official Linux client

 The file `~/.config/flow-electron/credentials` MUST exist for this to work, if you want automated login (only email/username and password ATM) the file must look like this:
```
USERNAME=your.username@domain.com
PASSWORD=secret.password
```

## Pre-compiled Binaries

Pre-compiled binaries for Linux are available in the [Releases](https://github.com/johangunnarn/telavox-flow-electron/releases) section

> **Note:** These binaries have only been tested on **amd64/x86_64** architectures

You can also build the app from source using:

```bash
git clone https://github.com/johangunnarn/telavox-flow-electron.git
cd telavox-flow-electron
npm install
npm run dist
```
