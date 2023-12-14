# # from flask import Flask, render_template
# # from alien_invasion import run_game  # Replace 'alien_invasion' with your actual entry file name

# # app = Flask(__name__)

# # @app.route('/')
# # def index():
# #     run_game()  # Assuming you have a function to start your game
# #     return render_template('index.html')

# # if __name__ == '__main__':
# #     app.run(debug=True)

# import pygame
# from pygame.sprite import Group
# from settings import Settings
# from game_stats import GameStats
# from scoreboard import Scoreboard
# from button import Button
# from ship import Ship
# import game_functions as gf

# import asyncio
# from flask import Flask, render_template
# from threading import Thread
# import time

# app = Flask(__name__)



# # ai_settings = Settings()
# # screen = pygame.display.set_mode(
# # (ai_settings.screen_width, ai_settings.screen_height) )
# # pygame.display.set_caption("Alien Invasion")

# # Dummy game state for demonstration
# game_state = {"score": 0}

# # This is your Pygame logic, separated into a function
# def run_game_logic():
#     global game_state
#     while True:
#         # Your game logic goes here
#         game_state["score"] += 1
#         time.sleep(1)  # Simulating some game processing time

# # Start the game logic in a separate thread
# game_thread = Thread(target=run_game_logic)
# game_thread.start()

# # # Flask route to render the template with game state
# # @app.route('/')
# # def index():
# #     return render_template('index.html', game_state=game_state)

# @app.route('/')

# # async def game():
 
# #  pygame.init()
# #  pygame.mixer.init()
# #  # Make the Play button.
# #  play_button = Button(ai_settings, screen, "Play")

# #  # Create an instance to store game statistics and create a scoreboard.
# #  stats = GameStats(ai_settings)
# #  sb = Scoreboard(ai_settings,screen,stats)

# #  #Make a ship, a group of bullets, and a group of aliens.
# #  ship = Ship(ai_settings, screen)
# #  bullets = Group()
# #  aliens = Group()

# #  # Create the fleet of aliens
# #  gf.create_fleet(ai_settings, screen, ship, aliens)

# #  # Start the main loop for the game.
# #  while True:
# #   gf.check_events(ai_settings, screen, stats,sb,   play_button, ship, aliens, bullets)

# #   if stats.game_active:
# #    ship.update()
# #    gf.update_bullets(ai_settings, screen,stats,sb, ship, aliens, bullets)
# #    gf.update_aliens(ai_settings,  stats, screen, ship, aliens, bullets)
  
# #   gf.update_screen(ai_settings, screen, stats,sb  , ship, aliens, bullets, play_button)
 
# #   await asyncio.sleep(0)
  
# # #asyncio.run(game())

# def run_game():
#  # Initialize pygame, settings, and screen object.
#  # Initialize game and create a screen object.
#  pygame.init()
#  ai_settings = Settings()
#  screen = pygame.display.set_mode(
#  (ai_settings.screen_width, ai_settings.screen_height))
#  pygame.display.set_caption("Alien Invasion")

#  # Make the Play button.
#  play_button = Button(ai_settings, screen, "Play")

#  # Create an instance to store game statistics and create a scoreboard.
#  stats = GameStats(ai_settings)
#  sb = Scoreboard(ai_settings,screen,stats)

#  #Make a ship, a group of bullets, and a group of aliens.
#  ship = Ship(ai_settings, screen)
#  bullets = Group()
#  aliens = Group()

#  # Create the fleet of aliens
#  gf.create_fleet(ai_settings, screen, ship, aliens)

#  # Start the main loop for the game.
#  while True:
#   gf.check_events(ai_settings, screen, stats,sb,   play_button, ship, aliens, bullets)

#   if stats.game_active:
#    ship.update()
#    gf.update_bullets(ai_settings, screen,stats,sb, ship, aliens, bullets)
#    gf.update_aliens(ai_settings,  stats, screen, ship, aliens, bullets)
  
#   gf.update_screen(ai_settings, screen, stats,sb  , ship, aliens, bullets, play_button)

# run_game()

# if __name__ == '__main__':
#     app.run(debug=True)






from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
