from settings import *
import random

class Block(pygame.sprite.Sprite):
    def __init__(self, tetromino, pos):
        self.tetromino = tetromino
        self.pos = vec(pos) + INIT_OFFSET
        self.alive = True

        super().__init__(tetromino.tetris.sprite_group)
        self.image = pygame.Surface([TILE_SIZE, TILE_SIZE])
        self.color = COLORS[self.tetromino.shape]
        pygame.draw.rect(self.image, self.color, (1, 1, TILE_SIZE - 2, TILE_SIZE - 2), border_radius=5)
        self.rect = self.image.get_rect()

    def living(self):
        if not self.alive:
            self.kill()

    def set_pos(self):
        self.rect.topleft = self.pos * TILE_SIZE

    def update(self):
        self.living()
        self.set_pos()

    def collided(self, pos):
        x,y = int(pos.x), int(pos.y)
        if 0 <= x < GRID_W and y < GRID_H and (y < 0 or not self.tetromino.tetris.grid_arr[y][x]):
            return False
        return True

    def rotate(self, pivot_pos):
        new_pos = self.pos - pivot_pos
        rotated = new_pos.rotate(90)
        return rotated + pivot_pos


class Tetromino():
    def __init__(self, tetris):
        self.tetris = tetris
        self.shape = random.choice(list(TETROMINOS.keys()))
        self.blocks = [Block(self, pos) for pos in TETROMINOS[self.shape]]
        self.dead = False

    def collided(self, block_pos):
        return any(map(Block.collided, self.blocks, block_pos))

    def rotate(self):
        pivot_pos = self.blocks[0].pos
        new_block_pos = [block.rotate(pivot_pos) for block in self.blocks]
        if not self.collided(new_block_pos):
            for i, block in enumerate(self.blocks):
                block.pos = new_block_pos[i]


    def move(self, direction):
        move_direction = MOVES[direction]
        new_block_pos = [block.pos + move_direction for block in self.blocks]
        collided = self.collided(new_block_pos)
        if not collided:
            for block in self.blocks:
                block.pos += move_direction
        elif direction == 'down':
            self.dead = True

    def update(self):
        self.move('down')
