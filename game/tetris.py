from settings import *
from tetromino import Tetromino

class Tetris:
    def __init__(self, app):
        self.app = app
        self.grid_arr = self.get_grid()
        self.sprite_group = pygame.sprite.Group()
        self.tetromino = Tetromino(self)
        self.accel = False

    def game_over(self):
        if self.tetromino.blocks[0].pos.y == INIT_OFFSET[1]:
            pygame.time.wait(300)
            return True

    def check_lines(self):
        row = GRID_H - 1
        for y in range(GRID_H - 1, -1, -1):
            for x in range(GRID_W):
                self.grid_arr[row][x] = self.grid_arr[y][x]
        
                if self.grid_arr[y][x]:
                    self.grid_arr[row][x].pos = vec(x, y)

            if sum(map(bool, self.grid_arr[y])) < GRID_W:
                row -= 1
            else: 
                for x in range(GRID_W):
                    self.grid_arr[row][x].alive = False
                    self.grid_arr[row][x] = 0

    def populate_array(self):
        for block in self.tetromino.blocks:
            x, y = int(block.pos.x), int(block.pos.y)
            self.grid_arr[y][x] = block

    def get_grid(self):
        return [[0 for x in range(GRID_W)] for y in range(GRID_H)]

    def control(self, which_key):
        if which_key == pygame.K_a or which_key == pygame.K_LEFT:
            self.tetromino.move(direction='left')
        elif which_key == pygame.K_d or which_key == pygame.K_RIGHT:
            self.tetromino.move(direction='right')
        elif which_key == pygame.K_s or which_key == pygame.K_DOWN:
            self.accel = True
        elif which_key == pygame.K_w or which_key == pygame.K_UP:
            self.tetromino.rotate()


    def check_tetromino_life(self):
        if self.tetromino.dead:
            if self.game_over():
                self.__init__(self.app)
            else:
                self.accel = False
                self.populate_array()
                self.tetromino = Tetromino(self)

    def update(self):
        trigger = [self.app.anim_trig, self.app.fast_anim_trig][self.accel]

        if trigger:
            self.check_lines()
            self.tetromino.update()
            self.check_tetromino_life()
        self.sprite_group.update()

    def draw_grid(self):
        for x in range(GRID_W):
            for y in range(GRID_H):
                pygame.draw.rect(self.app.screen, "white", (x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE), 1)

    def draw(self):
        self.draw_grid()
        self.sprite_group.draw(self.app.screen)
