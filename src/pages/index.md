---
layout: base
title: Home
permalink: /
---

<div class="hero">
    <h1>🎅 Programming Party 🎄</h1>
    <p class="tagline">Ho Ho Ho! A jolly gathering of PLU elves building magical projects together! 🎁</p>
</div>

<section class="about">
    <h2>What is Programming Party? 🤶</h2>
    <p>
        🎄 Programming Party is Santa's favorite community of passionate builders at Pacific Lutheran University! 
        Every week, we gather in our festive workshop to code creative, unconventional software projects. 
        Over 7 years, we've built everything from jingle-bell games to reindeer tracking simulators to 
        gingerbread-house designing apps!
    </p>
    <p>
        <strong>🎅 Our Holiday Mission</strong>: Spread Christmas cheer through code, learn together like Santa's elves, 
        and have fun building things that bring joy to the world! Remember: the best way to spread Christmas cheer 
        is coding loud for all to hear!
    </p>
    <p style="text-align: center; margin-top: 2rem;">
        <a href="{{ '/interview-prep/' | url }}" class="btn btn-primary">🎁 Interview Prep (Nice List Edition)</a>
    </p>
    <p style="text-align: center; margin-top: 1rem;">
        <a href="https://youtu.be/dQw4w9WgXcQ?si=Antry_QNgTHT_jGW" target="_blank" class="btn btn-secondary">🎄 Santa's Secret Message</a>
    </p>
</section>

<section class="featured-projects">
    <h2>Featured Holiday Projects 🎁</h2>
    <div class="project-grid">
        {% for project in collections.projects | slice(0, 3) %}
        <div class="project-card">
            {% if project.image %}
            <div class="project-image">
                <img src="{{ project.image }}" alt="{{ project.name }}" loading="lazy">
            </div>
            {% endif %}
            <h3>{{ project.name }}</h3>
            <p class="project-year">{{ project.year }} ❄️</p>
            <p class="project-description">{{ project.description }}</p>
            <div class="project-tags">
                {% for tag in project.tags | slice(0, 3) %}
                <span class="tag">{{ tag }}</span>
                {% endfor %}
            </div>
            <div class="project-links">
                {% if project.link.demo %}
                <a href="{{ project.link.demo }}" class="link-btn" target="_blank">🎅 Demo</a>
                {% endif %}
                {% if project.link.repository %}
                <a href="{{ project.link.repository }}" class="link-btn" target="_blank">🎄 Repo</a>
                {% endif %}
            </div>
        </div>
        {% endfor %}
    </div>
    <p class="view-all">
        <a href="{{ '/projects/' | url }}" class="btn btn-primary">🎁 View All Projects (Santa's Workshop)</a>
    </p>
</section>

<section class="join-us">
    <h2>Want to Join Santa's Coding Workshop?</h2>
    <p>🎄 Programming Party meets weekly during the school year at the North Pole (PLU campus)! 🎄</p>
    <p>All skill levels welcome - from Rudolph (beginners) to Santa (experts)!</p>
    <p>
        <a href="mailto:caleyjb@plu.edu">📧 Email Dr. Caley (Head Elf)</a> to get on the nice list, 
        or check out our <a href="https://github.com/PLU-Programming-Party">GitHub Winter Wonderland</a>.
    </p>
    <p style="margin-top: 2rem; font-size: 0.9em;">
        🦌 Special appearances by: Dasher, Dancer, Prancer, Vixen, Comet, Cupid, Donner, Blitzen, and Rudolph! 🦌
    </p>
</section>