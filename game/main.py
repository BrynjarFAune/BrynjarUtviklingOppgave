from settings import *
from tetris import Tetris
import sys

# pygame setup

class App():
    def __init__(self):
        pygame.init()
        pygame.display.set_caption("Tetris")
        self.screen = pygame.display.set_mode((WIDTH * TILE_SIZE, HEIGHT * TILE_SIZE))
        self.clock = pygame.time.Clock()
        self.timer()
        self.tetris = Tetris(self)

    def timer(self):
        self.user_event = pygame.USEREVENT + 0
        self.fast_user_event = pygame.USEREVENT + 1
        self.anim_trig = False
        self.fast_anim_trig = False
        pygame.time.set_timer(self.user_event, ANIMATION_INTERVAL)
        pygame.time.set_timer(self.fast_user_event, FASTER_ANIMATION_INTERVAL)

    def update(self):
        self.tetris.update()
        self.clock.tick(FPS)

    def draw(self):
        self.screen.fill(color=GAME_COLOR)
        self.tetris.draw()
        pygame.display.flip()

    def get_events(self):
        self.anim_trig = False
        self.fast_anim_trig = False
        for event in pygame.event.get():
            if event.type == pygame.QUIT or (event.type == pygame.KEYDOWN and event.key == pygame.K_ESCAPE):
                pygame.quit()
                sys.exit()
            elif event.type == pygame.KEYDOWN:
                self.tetris.control(which_key=event.key)
            elif event.type == self.user_event:
                self.anim_trig = True
            elif event.type == self.fast_user_event:
                self.fast_anim_trig = True

    def run(self):
        while True:
            self.get_events()
            self.update()
            self.draw()

app = App()
app.run()
