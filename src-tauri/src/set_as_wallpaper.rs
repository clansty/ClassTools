use windows::{
    core::*,
    Win32::{Foundation::*, UI::WindowsAndMessaging::*},
};

static mut WORKVIEW: HWND = HWND(0);

pub unsafe fn set_as_wallpaper(window: HWND) -> bool {
    let progman = FindWindowW(w!("Progman"), None);
    println!("progman: {:?}", progman);

    SendMessageTimeoutW(
        progman,
        0x052C,
        WPARAM(0),
        LPARAM(0),
        SEND_MESSAGE_TIMEOUT_FLAGS(0),
        1000,
        std::ptr::null_mut(),
    );

    unsafe extern "system" fn enum_window(tophandle: HWND, _: LPARAM) -> BOOL {
        let defview = FindWindowExW(tophandle, HWND(0), w!("SHELLDLL_DefView"), None);
        if defview != HWND(0) {
            println!("Found DefView: {:?}", defview);
            WORKVIEW = FindWindowExW(None, tophandle, w!("WorkerW"), None);
            println!("Found WorkerW: {:?}", WORKVIEW);
        }

        true.into()
    }

    EnumWindows(Some(enum_window), LPARAM(0));

    if WORKVIEW != HWND(0) {
        SetParent(window, WORKVIEW);
        true
    } else {
        false
    }
}
