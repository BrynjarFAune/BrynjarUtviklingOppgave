import pygame

vec = pygame.math.Vector2

GAME_COLOR = "black"
FPS = 60
GRID_SIZE = GRID_W, GRID_H = 10, 20
WIDTH = GRID_W
HEIGHT = GRID_H
TILE_SIZE = 40
ANIMATION_INTERVAL = 300
FASTER_ANIMATION_INTERVAL = 10

MOVES = {'left': vec(-1, 0), 'right': vec(1, 0), 'down': vec(0, 1)}

INIT_OFFSET = vec(GRID_W // 2 - 1, 0)

TETROMINOS = {
    'T': [(0,0), (-1, 0), (1, 0), (0, -1)],
    'J': [(0,0), (-1, 0), (0, -1), (0, -2)],
    'O': [(0,0), (0, -1), (1, 0), (1, -1)],
    'L': [(0,0), (1, 0), (0, -1), (0, -2)],
    'I': [(0,0), (0, 1), (0, -1), (0, -2)],
    'S': [(0,0), (-1, 0), (0, -1), (1, -1)],
    'Z': [(0,0), (1, 0), (0, -1), (-1, -1)],
}

COLORS = {
    'T': 'orange',
    'J': 'purple',
    'O': 'yellow',
    'L': 'green',
    'I': 'blue',
    'S': 'red',
    'Z': 'cyan',
}
