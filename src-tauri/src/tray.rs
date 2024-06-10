use tauri::{AppHandle, CustomMenuItem, SystemTray, SystemTrayEvent, SystemTrayMenu};

pub fn create() -> SystemTray {
    let quit = CustomMenuItem::new("quit", "Quit");

    let tray_menu = SystemTrayMenu::new().add_item(quit);

    SystemTray::new().with_menu(tray_menu)
}

pub fn handle(app: &AppHandle, event: SystemTrayEvent) {
    match event {
        SystemTrayEvent::MenuItemClick { id, .. } => {
            if id == "quit" {
                app.exit(0);
            }
        }
        _ => {}
    }
}
