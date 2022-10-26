{ pkgs ? import <nixpkgs> {} }:
  pkgs.mkShell {
    buildInputs = with pkgs; [
      yarn
      nodejs-16_x
    ];

    ELECTRON_OVERRIDE_DIST_PATH = "${pkgs.electron_20}/bin";
}
