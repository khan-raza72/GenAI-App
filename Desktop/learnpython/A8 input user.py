import pygame
import random
import sys

# Initialize pygame
pygame.init()

# Screen dimensions
WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Eid Mubarak Celebration")

# Colors
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
YELLOW = (255, 223, 0)
GREEN = (0, 255, 0)
RED = (255, 0, 0)
BLUE = (0, 0, 255)
PURPLE = (128, 0, 128)

# Clock for controlling frame rate
clock = pygame.time.Clock()

# Font for text
font = pygame.font.Font(None, 74)
small_font = pygame.font.Font(None, 36)

# Crescent moon properties
moon_x = WIDTH // 2
moon_y = HEIGHT // 3
moon_radius = 50
moon_inner_radius = 40

# Star properties
stars = [(random.randint(0, WIDTH), random.randint(0, HEIGHT // 2)) for _ in range(50)]

# Firework properties
fireworks = []

def create_firework():
    x = random.randint(100, WIDTH - 100)
    y = random.randint(100, HEIGHT // 2)
    color = random.choice([RED, GREEN, BLUE, PURPLE])
    return {"x": x, "y": y, "color": color, "radius": 1, "max_radius": random.randint(30, 50)}

# Game loop
running = True
frame_count = 0
while running:
    screen.fill(BLACK)

    # Event handling
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Draw crescent moon
    pygame.draw.circle(screen, YELLOW, (moon_x, moon_y), moon_radius)
    pygame.draw.circle(screen, BLACK, (moon_x + 15, moon_y), moon_inner_radius)

    # Draw stars
    for star in stars:
        pygame.draw.circle(screen, WHITE, star, 2)

    # Display "Eid Mubarak" text with animation
    text = font.render("Eid Mubarak : RAZA! ", True, GREEN)
    text_x = WIDTH // 2 - text.get_width() // 2
    text_y = HEIGHT // 2 + (10 * (frame_count % 20) - 100)  # Bouncing effect
    screen.blit(text, (text_x, text_y))

    # Display smaller text
    small_text = small_font.render("Wishing you joy and blessings!", True, WHITE)
    screen.blit(small_text, (WIDTH // 2 - small_text.get_width() // 2, HEIGHT // 2 + 100))

    # Create fireworks
    if frame_count % 30 == 0:  # Add a new firework every 30 frames
        fireworks.append(create_firework())

    # Update and draw fireworks
    for firework in fireworks[:]:
        pygame.draw.circle(screen, firework["color"], (firework["x"], firework["y"]), firework["radius"])
        firework["radius"] += 2
        if firework["radius"] > firework["max_radius"]:
            fireworks.remove(firework)

    # Update display
    pygame.display.flip()


    # Control frame rate
    clock.tick(30)
    frame_count += 1

# End game
pygame.quit()
sys.exit()