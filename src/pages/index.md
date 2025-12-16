---
layout: base
title: Home
permalink: /
---

<div class="hero">
    <h1>🚀 Programming Party</h1>
    <p class="tagline">A weekly gathering of PLU students and alumni building silly, creative projects together</p>
</div>

<section class="about">
    <h2>What is Programming Party?</h2>
    <p>
        Programming Party is a community of passionate builders at Pacific Lutheran University. 
        Every week, we gather to work on creative, unconventional, and often silly software projects. 
        Over 7 years, we've built everything from music-based games to energy management simulators to emotion-detecting webcam games.
    </p>
    <p>
        <strong>Our Mission</strong>: Celebrate collaborative creativity, learn together, and have fun building things that don't have to be practical to be amazing.
    </p>
    <p style="text-align: center; margin-top: 2rem;">
        <a href="https://youtu.be/dQw4w9WgXcQ?si=Antry_QNgTHT_jGW" target="_blank" class="btn btn-primary">Important Information</a>
    </p>
</section>

<section class="featured-projects">
    <h2>Featured Projects</h2>
    <div class="project-grid">
        {% for project in collections.projects | slice(0, 3) %}
        <div class="project-card">
            {% if project.image %}
            <div class="project-image">
                <img src="{{ project.image }}" alt="{{ project.name }}" loading="lazy">
            </div>
            {% endif %}
            <h3>{{ project.name }}</h3>
            <p class="project-year">{{ project.year }}</p>
            <p class="project-description">{{ project.description }}</p>
            <div class="project-tags">
                {% for tag in project.tags | slice(0, 3) %}
                <span class="tag">{{ tag }}</span>
                {% endfor %}
            </div>
            <div class="project-links">
                {% if project.link.demo %}
                <a href="{{ project.link.demo }}" class="link-btn" target="_blank">Demo</a>
                {% endif %}
                {% if project.link.repository %}
                <a href="{{ project.link.repository }}" class="link-btn" target="_blank">Repo</a>
                {% endif %}
            </div>
        </div>
        {% endfor %}
    </div>
    <p class="view-all">
        <a href="{{ '/projects/' | url }}" class="btn btn-primary">View All Projects →</a>
    </p>
</section>

<section class="join-us">
    <h2>Want to Join?</h2>
    <p>Programming Party meets weekly during the school year. All skill levels welcome!</p>
    <p><a href="mailto:caleyjb@plu.edu" style="color: white; font-weight: 600; text-decoration: underline;">Email Dr. Caley</a> to get involved, or check out our <a href="https://github.com/PLU-Programming-Party" style="color: white; font-weight: 600; text-decoration: underline;">GitHub organization</a>.</p>
</section>

