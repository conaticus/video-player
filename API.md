# API.md

This document is just a quick overview of how user input = api functions. This is to help us understand how much we have left to do.

## Menus
Menu keybinds are prefixed with "shift".

Feature | Keybind | Status | Notes
--- | --- | --- | ---
About | Shift+A | Not completed
Help | Shift+H | Not completed
Plug-ins | Shift+P | Not completed | This will require us to setup the plugins server
Settings | Shift+S | Not completed

## Player functions
Player functions are prefixed with "ctrl", exceptions are given to common commands (like play).

Player functions are all planned to be callable through a right-click menu.

Feature | Keybind | Status | Notes
--- | --- | --- | ---
Open | Ctrl+O | Not completed* | * Different keybind 
Open Multiple | Ctrl+Shift+O | Not completed | Opens dialog to open files *or* folder from. This replaces the previously planned "open folder" feature.
Play | P/Space | Completed
Pause | P/Space | Completed
Stop | S | Not completed
Next | Ctrl+N | Not completed* | * Different keybind
Prev | Ctrl+P | Not completed* | * Different keybind
+5s | Right | Not completed* | * Different keybind
+10s | Ctrl+Right | Not completed | If the user holds down the right button or clicks it `x` times, the interval that it skips will increase to 30s.
-5s | Left | Not completed* | * Different keybind
-10s | Ctrl+Right | Not completed | If the user holds down the left button or clicks it `x` times, the interval that it skips will increase to 30s.
0-9 | Skips `number`/10 way through the video | Not completed | Potential feature

## Subtitle functions
Subtitle functions are *technically* player functions, thus have the same rules.

Feature | Keybind | Status | Notes
--- | --- | --- | ---
Toggle | Ctrl+S | Not completed 
Switch to next subtitle track | Ctrl+Shift+Up | Not completed 
Switch to previous subtitle track | Ctrl+Shift+Down | Not completed 
Load subtitle file | Drag and Drop/Ctrl+L | Not completed

## Audio functions
Audio functions are *technically* player functions, thus have the same rules.

Feature | Keybind | Status | Notes
--- | --- | --- | ---
Mute | M | Completed
Volume up | Up | Not completed
Volume down | Down | Not completed
Switch to next audio track | Ctrl+Up | Not completed | Check for HTML5 video api support
Switch to previous audio track | Ctrl+Down | Not completed | Check for HTML5 video api support

## Plugin functions
Plugin functions don't have any rules. If a plugin keybind is the same as a built-in keybind, then both functions will run when the keybind is pressed. To avoid this, plugin creators should allow the user to easily edit the keybinds used in the plugins using their setting menu. Plugin creators can ditch keybinds entirely and instead add a button to the right-click menu.

## Remapping keys
The previously listed keybinds can be remapped. This is a work in progress feature. Plugin functions may not be remapped, as it depends on if the plugin creator gives the options to remap keybinds (users can edit the plugin source code if the creator does not give the option to remap keybinds).