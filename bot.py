# bot.py
import os

import discord


client = discord.Client()

@client.event
async def on_ready():
    print(f'{client.user.name} has connected to Discord!')


client.run("NzI0MTA0NzY3MjIzMjM0NjMx.XvEPoQ.Fv9ijmBg-koOqOT8p824_UZ-YpU")