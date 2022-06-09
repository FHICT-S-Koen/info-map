#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

fn main() {
  tauri::Builder::default()
    .manage(State(Mutex::new(InnerState { path: None })))
    .invoke_handler(tauri::generate_handler![get_notes, save_notes])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

use std::{
  fs::{self, File},
  io::Write,
  sync::Mutex,
};

struct State(Mutex<InnerState>);

struct InnerState {
  path: Option<String>,
}

#[tauri::command]
fn save_notes(notes: String, state: tauri::State<State>) {
  if let Some(path) = state.0.lock().unwrap().path.clone() {
    if let Ok(mut file) = File::create(path) {
      file.write_all(notes.as_bytes()).unwrap();
    }
  }
}

#[tauri::command]
fn get_notes(path: String, state: tauri::State<State>) -> String {
  state.0.lock().unwrap().path = Some(path.clone());
  fs::read_to_string(path).unwrap()
}