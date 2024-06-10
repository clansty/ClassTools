// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod set_as_wallpaper;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let wallpaper_window = tauri::WindowBuilder::new(
                app,
                "wallpaper", /* the unique window label */
                tauri::WindowUrl::App("#wallpaper".into()),
            )
            .fullscreen(true)
            .visible(false)
            .build()
            .expect("failed to build window");

            let handle = wallpaper_window.hwnd().expect("hwnd?");
            let set_result = unsafe { set_as_wallpaper::set_as_wallpaper(handle) };
            if set_result {
                wallpaper_window.show().expect("failed to show window");
            } else {
                panic!("Failed to find WorkerW window")
            }

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
