# PawPaths — Mobile App Blueprint

A **mobile-first social network for dog owners** to discover, track, save, and share walking routes with dog-specific safety insights.

## 1) Product Vision

PawPaths helps dog owners answer three daily questions:
1. **Where can I walk my dog today?**
2. **Is it safe right now?** (bugs, heat, glass, aggressive dogs, etc.)
3. **Who else nearby shares my dog-walking lifestyle?**

Think of it as **Strava + Wikiloc**, redesigned for dog owners and real-world safety.

---

## 2) Target Users

- **Urban dog owners** needing nearby, safe, repeatable routes.
- **New dog parents** learning good walk locations and routines.
- **Community-minded owners** who want to share updates and alerts.
- **Traveling owners** searching dog-friendly routes in unfamiliar places.

---

## 3) Core Use Cases

1. **Track a walk** with GPS, distance, duration, pace, elevation.
2. **Save routes** privately or publicly.
3. **Share routes/posts** with friends and local dog community.
4. **Add warnings/hazards** to map points (bugs, broken glass, poison bait, off-leash aggressive dog, flooding, heat risk, etc.).
5. **Find routes by dog profile** (small dog, senior dog, high-energy dog).
6. **See live/community freshness** (recent reports and route activity).

---

## 4) MVP Feature Set (Mobile App)

### A. Authentication & Profiles
- Email/social login.
- Human profile + dog profile(s): name, breed, age, size, activity level.
- Optional privacy controls for profile visibility.

### B. Map + Route Discovery
- Home map showing nearby routes and warnings.
- Filters:
  - Distance, difficulty, elevation.
  - Surface type (pavement, dirt, park trails).
  - Dog suitability (puppy-friendly, stroller-friendly, senior-friendly).
  - Time-of-day recommendations (shade available, lighting).

### C. Walk Tracking
- Start/pause/finish GPS tracking.
- Show distance, time, pace, elevation.
- Save as private/public route.
- Add notes/photos after walk.

### D. Social Layer
- Follow users/friends.
- Activity feed (new routes, completed walks, warnings).
- Like/comment/save/share.

### E. Safety Warnings (Critical Differentiator)
- Drop a warning pin with category, severity, optional photo.
- Suggested warning types for MVP:
  - Bugs/ticks/fleas hotspot.
  - Broken glass/sharp objects.
  - Poison risk/unsafe food scraps.
  - Aggressive dog sightings.
  - Heavy traffic/no sidewalk.
  - Extreme heat / no shade / no water.
- Warning TTL (time-to-live): user sets expiry, community can confirm/clear.
- Upvote/“still relevant” mechanism for freshness.

### F. Saved Lists
- Favorite routes.
- “Want to try” list.
- Offline save (basic route geometry + notes) for poor connectivity areas.

---

## 5) Suggested Tech Stack (Fast, Modern, Mobile)

### Mobile App
- **React Native with Expo** (single codebase for iOS + Android, quick iteration).
- Maps: Mapbox or Google Maps SDK.
- Background/location tracking for walk recording.

### Backend
- **Supabase** (Postgres + auth + storage + realtime) to speed MVP.
- PostGIS extension for geospatial queries (nearby routes/warnings).
- Object storage for photos.

### Optional ML/Intelligence (Phase 2+)
- Route quality scoring (safety + popularity + freshness).
- Personalized recommendations based on dog profile and past walks.

---

## 6) Data Model (MVP-Level)

- `users`
- `dogs` (linked to users)
- `routes` (creator, polyline, metadata)
- `walk_sessions` (tracked activities)
- `warnings` (geo point, category, severity, expiry)
- `warning_votes` (confirm/still relevant/cleared)
- `posts` (optional social content)
- `follows`, `likes`, `comments`, `saved_routes`

Geospatial indexes are essential for:
- nearby route search,
- nearby warning overlays,
- “on-route risk” summaries.

---

## 7) UX Flow (Simple and Sticky)

1. Open app → map centered on user.
2. Tap **Start Walk** or choose a suggested nearby route.
3. During walk, get contextual alerts if entering a warning zone.
4. End walk → save + optionally publish.
5. Prompt user to add quick safety updates for community.
6. Feed shows friends’ walks and new local warnings.

This creates a loop of **track → share → protect community → discover more**.

---

## 8) Safety, Trust, and Moderation

- Community reporting + reputation score.
- Rate limits and spam detection for warning pins.
- Flag/report abusive content.
- Clear legal disclaimer: community-generated risk data is informative, not guaranteed.
- Approximate-location option for privacy when posting.

---

## 9) Monetization Ideas

- **Freemium**:
  - Free: core tracking + warnings + social feed.
  - Premium: advanced analytics, heatmaps, route planner, offline full maps.
- Partnerships:
  - Pet brands, vets, dog trainers, dog-friendly cafés/parks.
- Local promoted dog-friendly routes/events.

---

## 10) 12-Week MVP Roadmap

### Weeks 1–2: Product & Design
- Finalize scope and user stories.
- Wireframes: onboarding, map, tracking, route detail, warnings.
- Brand and design system basics.

### Weeks 3–6: Core Build
- Auth + profile + dog profiles.
- Map + route browsing.
- Tracking session lifecycle.
- Route saving and viewing.

### Weeks 7–9: Social + Safety
- Follow/feed/likes/comments.
- Warning pin creation, display, and expiry flow.
- Basic moderation and reporting.

### Weeks 10–11: Quality
- QA, performance tuning, battery optimization.
- Closed beta with local dog-owner testers.

### Week 12: Launch
- Release prep (App Store + Google Play).
- Analytics instrumentation and feedback loop.

---

## 11) KPIs to Track Early

- Weekly active walkers (WAW).
- Walks tracked per active user.
- Routes saved/shared.
- Warning creation and validation rate.
- 4-week retention.
- % of sessions that interact with map warnings.

---

## 12) Practical Next Step

Start with an MVP that nails:
1. **Reliable tracking**,
2. **Route discovery**,
3. **Useful warning system**,
4. **Light social sharing**.

If these four are strong, you have a clear niche and a strong foundation to expand into events, groups, and dog health integrations.
