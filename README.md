# Video Player

An open-source minimalistic video player that can be controlled with just the keyboard. It is almost fully customizable - allowing the user to create their own changes and additions to the program to suit their needs.

### **Features**

Here are all the keybinds in the program:
Feature | Description | Key | Notes | API function
--- | --- | --- | --- | ---
Help | Open a help menu, giving you access to useful commands | Ctrl+H | You can also open this menu in the right click menu | load_toplevel()
About | Open an about menu, giving you information about the program | Ctrl+A | You can also open this menu in the right click menu | load_toplevel()
Open marketplace | Open a marketplace sidebar that allows the user to easily search for extensions | Ctrl+M | WIP | load_popup()
--- | --- | --- | --- | ---
Open file | Opens a file to play | Ctrl+O | See supported file types -- You can also open files using the right click menu | load_video(\_dialog=True)
Open link | Opens a url containing a video | Ctrl+Alt+O | See supported file types | network_request() && load_video()
Open folder | Opens a folder to play | Ctrl+Shift+O | See supported file types -- You can also open folders using the right click menu | load_folder(\_dialog=True)
--- | --- | --- | --- | ---
Play/Pause | Play/Pause the open media | P / Space | Media can also be played using the right click menu | control_play()
Stop | Pause and close the open media | S | Media can also be stopped using the right click menu | control_stop()
Hide | Pauses the video and blacks out the screen without closing the video | H | Hide function displays a warning if the user tries to resume playback | control_hide()
Next media | Plays next media in the folder | Ctrl+Alt+Left | This only works when a folder has been opened | control_next()
Previous media | Plays next media in the folder | Ctrl+Alt+Right | This only works when a folder has been opened | control_prev()
Fullscreen | Fullscreens the video | F / F11 | Depending on settings, this may also stretch the video to the screen size (disabled by default) | control_fullscreen()
Take screenshot | Takes a screenshot of the media player, if subtitles are toggled on they will be included in the screenshot | F2 / F12 | | Controlled by GUI plugin
--- | --- | --- | --- | ---
Next Frame | Pause and skip to the next frame of the media | Ctrl+Left | | set_duration()
Last Frame | Pause and skip to the last frame of the media | Ctrl+Right | | set_duration()
Skip +5s | Skip 5 seconds ahead | Left | Holding for `x` `time` increases skip to 10 seconds | set_duration()
Skip -5s | Skip 5 seconds behind | Right | Holding for `x` `time` increases skip to 10 seconds | set_duration()
Skip +10s | Skip 10 seconds ahead | Shift+Left | Holding for `x` `time` increases skip to 30 seconds | set_duration()
Skip -10s | Skip 10 seconds behind | Shift+Right | Holding for `x` `time` increases skip to 30 seconds | set_duration()
Skip +30s | Skip 30 seconds ahead | Ctrl+Shift+Left | Holding for `x` `time` increases skip to 60 seconds | set_duration()
Skip -30s | Skip 30 seconds behind | Ctrl+Shift+Right | Holding for `x` `time` increases skip to 60 seconds | set_duration()
Skip to next subtitle | Skips to the start time of the next subtitle | Tab | Depends on the timing of the subtitle file | get_subtitle_time() && set_duration()
Skip to last subtitle | Skips to the start time of the last subtitle | Shift+Tab | Depends on the timing of the subtitle file | get_subtitle_time() && set_duration()
Skip to next chapter | Skips to the next chapter in the video | E | Requires video loaded has chapter functionality and has chapters assigned | ADDME
Skip to last chapter | Skips to the last chapter in the video | Q | Requires video loaded has chapter functionality and has chapters assigned | ADDME
--- | --- | --- | --- | ---
Mute | Mutes the audio | M | control_mute()
Volume up +1 | Turns the volume up 1% | Up | | control_volume()
Volume down -1 | Turns the volume down 1% | Up | | control_volume()
Volume up +10 | Turns the volume up 10% | Shift+Up | | control_volume()
Volume down -10 | Turns the volume down 10% | Shift+Up | | control_volume()
--- | --- | --- | --- | ---
--- | --- | --- | --- | ---
Playback speed | Changes the playback speed based on user input | -9 - 9 | - + 0-9 decreases the playback speed, 0-9 increases the playback speed
Open subtitle file | Opens a subtitle file/folder containing subtitle files and loads them | Ctrl+C | See supported file types | load_sub()
Open online subtitle file | Opens a subtitle file using a link | Ctrl+Alt+C | See supported file types | network_request() && load_sub()
Toggle subtitles/captions | Toggles the subtitles on/off | C | |
Toggle NL subtitles/captions | Toggles a 2nd set of subtitles on/off | Shift+C | NL = Native Language | load_sub(\_NL=True)
Switch subtitle track | Switches between the loaded subtitle tracks | V | | load_sub()
Switch NL subtitle track | Switches between the loaded subtitle tracks for the NL subtitles | Shift+V | NL = Native Language | load_sub(\_NL=True)
Switch audio track | Switches between the avalible audio tracks | B | Depends on file type/content (files must have multiple audio tracks) | ADDME
--- | --- | --- | --- | ---
Open plugin manager | Opens the plugin manager window, where user-created scripts can be toggled on/off using a GUI | Shift+P | There will be multiple plugins provided by the development team, but abled users are encouraged to make their own so their experience can be more tailored to their needs | load_toplevel()
Open settings | Opens the settings window, where settings can be edited using a GUI | Shift+S | Settings can also be opened using the right-click menu | load_toplevel()
Open dictionary file | Opens a dictionary file | Shift+D | See supported file types | Dictionaries are arguments, not api calls.
Open online dictionary file | Opens a dictionary file using the internet | Shift+Alt+D | See supported file types | network_request()
--- | --- | --- | --- | ---
Show translation | Shows the translation of the word you are hovering over | Alt | Dictionary handlers (can be plugins) decide where to seperate words for each language, otherwise it will use a space as the seperator - this means languages without spaces will need a plugin to have this feature fully supported | load_popup()
Make SRS card | Prompts a card-maker GUI for your connected SRS | Ctrl+S | Depends on what plugin is active |

NOTE: You can also control certain media functions with the expected media keys that come on certain keyboards.

As you can see, many functions are controlled via the keyboard - and not GUI. You can use plugins to control GUI elements, if you feel more comfortable using a GUI to control the program, but everything that you need to do is provided easily through the keybinds. These keybinds are fully user-customiseable, and you can change them easily in the settings menu.

To start watching media, you only need a handful of the above keybinds. But, to take advantage of Konakona Miru's full potential, we recommend users commit these keybinds to memory.

---

### **Supported file types**

#### **Video**

| File type      | Extention |
| -------------- | --------- |
| MPEG-4 Part 14 | .mp4      |
| Matroska       | .mkv      |
| AVI            | .avi      |
| WebM           | .webm     |

#### **Audio**

| File type              | Extention |
| ---------------------- | --------- |
| MPEG-4 Part 14         | .mp4      |
| MPEG-1 Audio Layer III | .mp3      |
| Matroska               | .mkv      |
| AVI                    | .avi      |
| WebM                   | .webm     |
| FLAC                   | .flac     |
| Raw                    | .raw      |

#### **Subtitles**

| File type             | Extention |
| --------------------- | --------- |
| MPEG-4 Part 14        | .mp4      |
| Matroska              | .mkv      |
| SubRip                | .srt      |
| Aegisub subtitle file | .ass      |

NOTE: Plugins can be used to read other file types

---

### **Plugins**

We have been talking a lot about user plugins but we haven't explained how they work. Some parts of the program actually use plugins that are just stored elsewhere, like the gui and dictionary handling, this makes it easy to overwrite said plugins.

For reference, here is a folder structure of a plugin:

```
src
└─ /plugins
   └─ /example_plugin
      ├─ index.js
      ├─ settings.js
      └─ settings.json
```

Plugins are Typescript file(s) stored in a folder in `/plugins/[Plugin Name]/`

-   Plugins can have their own tab on the settings window using a `settings.ts` file.
-   Plugins can store their settings in a `settings.json` file. (Settings follow the format: "key/setting name": (type (checkbox, number, etc.), variable))
-   Plugins can run their code in a `index.js` file

NOTE: Other programming languages might be avalible to create plugins in

Plugins can replace pre-built things, or make additions onto the program. For example, the video player is something that can be "overwritten" with a plugin, all you have to do is specify that you want that plugin to handle everything instead of the default player. This allows for additions, like a player that can support a niche file type.

To start writing your own plugins, you can use the api to control various aspects of the program.

You can control everything seen above in the features list

You can bind your own functions to a keybind - plugin creators are recommended to make a `settings.js` file to handle this.

Some plugins might handle the same filetype, in this senario the program will choose whatever plugin is higher on the installed plugins list on the settings menu. Plugin creators should create good settings to avoid clashes from happening, so the user can choose which plugin handles what.

### **Credits**

Special thanks to the following people for their contributions to the project:

-   Nathaniel James - Helping with the design side of the project
