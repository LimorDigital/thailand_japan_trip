# Architecture Overview

## System Purpose

Create a trusted personal travel agent experience via WhatsApp for the Japan & Thailand family trip.

## High-Level Architecture

1. WhatsApp Business API
   - Entry point for family messages
   - Sends proactive briefings, reminders, notifications
   - Receives family questions and commands

2. API Backend
   - Handles message webhook events
   - Persists conversations, travelers, bookings, itinerary data
   - Calls Claude API for natural language understanding and response generation
   - Orchestrates workflows and reminders

3. Claude API
   - Core assistant intelligence
   - Generates personalized WhatsApp messages
   - Maintains conversation memory and trip context
   - Implements proactive alerts and recommendations

4. Supabase / PostgreSQL
   - Stores users, trip details, bookings, itinerary items, reminders, expenses, weather alerts, and conversation memory
   - Provides row-level access and real-time triggers

5. n8n Automation
   - Scheduled workflows for daily briefings, weather checks, booking monitoring, and reminders
   - Triggered workflows on data changes, booking expirations, or ticket availability
   - Integrates with external APIs (weather, flight status, reservations)

6. Google Calendar
   - Sync trip events and reminders
   - Create departure, check-in, train and attraction reminders

7. External APIs
   - Flight status providers
   - Weather APIs for alerts
   - Booking sites or reservation platforms for availability monitoring
   - Map and transit APIs for travel time estimation

## Recommended Production Architecture

- Node.js / TypeScript backend deployed to serverless or containerized infrastructure
- Supabase-managed PostgreSQL database
- n8n deployed in Docker or Supabase-compatible environment
- WhatsApp Business API via Meta Cloud / verified WhatsApp business account
- Claude API from Anthropic for generative agent responses
- Google Calendar via OAuth integration for calendar events and reminders

## Conversation Memory Structure

The assistant should maintain memory at three levels:

1. Trip-level memory
   - Travelers, dates, destinations, travel style, confirmed accommodations
   - Must-do experiences, dislikes, and trip goals

2. Session-level memory
   - Recent WhatsApp conversation history
   - Last asked questions and outstanding actions
   - Current booking window or reservation prompts

3. Entity-level memory
   - Flights, hotels, trains, attractions, reservations, expenses
   - Status and notification history
   - Confirmation numbers and contact details

## Core API Flows

- Incoming WhatsApp message -> webhook -> parse intent -> update state -> generate response -> send via WhatsApp
- New booking or schedule update -> persist -> send confirmation alert
- Scheduled daily briefing -> query itinerary + weather + reminders -> generate personalized summary -> send
- Reminder trigger -> create WhatsApp notification and calendar event
- Availability alert -> detect change -> send proactive recommendation

## Data Ownership & Personalization

Store explicit trip rules and preferences: family travel style, pacing preferences, activity priorities, and off-limits behaviors.

Use this to shape every response, e.g. avoid suggesting overly rushed schedules or tourist traps, and favor nature, local culture, and family-friendly experiences.
