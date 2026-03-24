Simple electron wrapper for Telavox Flow. Made because Telavox' Flow program works horribly when using Wine and they don't have a standalone Linux client

This automatically logs in with your credentials (Only username and password supported)

The credentials must be put in a file in ~/.config/flow-electron/credentials and should look like this:

USERNAME=your.username@domain.com
PASSWORD=secret.password
