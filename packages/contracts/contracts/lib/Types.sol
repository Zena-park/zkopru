// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity = 0.6.12;

enum Layer2sKind { NONE, PLASMA, ZKOPRU, ROLLUP, UNDEFINED }

struct Watcher {
    Layer2sKind kind;
    uint256 port;
    string  host;
}

struct Layer2s {
    Layer2sKind kind;
    uint256 port;
    string  host;
    string  name;
}

