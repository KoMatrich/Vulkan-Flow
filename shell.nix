{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  name = "vulkan-flow";

  nativeBuildInputs = with pkgs; [
    bun
  ];
}
