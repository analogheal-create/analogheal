# AnalogHeal Forensics - Database Documentation

This document outlines the database schema and storage configuration used for the AnalogHeal Forensics platform, integrated via Supabase.

## Database Tables

### `forensic_results`
Stores the authenticated recovery evidence displayed on the public "Verified Forensic Results" layer.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | PRIMARY KEY, DEFAULT gen_random_uuid() | Unique identifier for the forensic record. |
| `created_at` | `timestamp` | DEFAULT now() | The timestamp when the record was published. |
| `label` | `text` | NOT NULL | The case label (e.g., "Forensic Reclamation - $1.2M"). |
| `date` | `text` | NOT NULL | The human-readable verification date (e.g., "Nov 25"). |
| `forensic_id` | `text` | | The unique forensic case ID (e.g., "#882-01"). |
| `image_url` | `text` | NOT NULL | The public URL of the authenticated screenshot. |

### `operational_proofs`
Stores the institutional trust images (Expert Team, SOC, Brand Logo, etc.) displayed on the homepage and across the platform.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | PRIMARY KEY, DEFAULT gen_random_uuid() | Unique identifier. |
| `created_at` | `timestamp` | DEFAULT now() | Creation date. |
| `asset_key` | `text` | NOT NULL, UNIQUE | The identifier (e.g., "brand-logo", "expert-team", "secure-ops", "consultation"). |
| `label` | `text` | NOT NULL | Display label. |
| `image_url` | `text` | NOT NULL | Public image URL. |

### `articles`
Stores the knowledge hub guides and security research.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | PRIMARY KEY, DEFAULT gen_random_uuid() | Unique identifier. |
| `created_at` | `timestamp` | DEFAULT now() | Creation date. |
| `category` | `text` | NOT NULL | e.g., "Security", "Recovery", "Legal". |
| `title` | `text` | NOT NULL | Article title. |
| `description` | `text` | NOT NULL | Short summary. |
| `content` | `text` | NOT NULL | Full article content. |
| `image_url` | `text` | NOT NULL | Public image URL. |

### `case_studies`
Stores the "Proven Recovery Results" case studies and client testimonials.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | PRIMARY KEY, DEFAULT gen_random_uuid() | Unique identifier. |
| `created_at` | `timestamp` | DEFAULT now() | Creation date. |
| `name` | `text` | NOT NULL | Client name/initials. |
| `role` | `text` | NOT NULL | Client role (e.g., "Private Investor"). |
| `title` | `text` | NOT NULL | Case title. |
| `result` | `text` | NOT NULL | Recovery result (e.g., "$32,700 Recovered"). |
| `metrics` | `text` | NOT NULL | Technical metrics/methods used. |
| `quote` | `text` | NOT NULL | Client testimonial text. |
| `case_id` | `text` | NOT NULL | Display case number (e.g., "#1042"). |
| `icon_type` | `text` | NOT NULL | Icon identifier ('trending', 'shield', 'zap'). |

#### SQL Schema
```sql
-- Forensic Results
CREATE TABLE forensic_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  label TEXT NOT NULL,
  date TEXT NOT NULL,
  forensic_id TEXT,
  image_url TEXT NOT NULL
);

-- Operational Proofs (Trust Assets)
CREATE TABLE operational_proofs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  asset_key TEXT NOT NULL UNIQUE,
  label TEXT NOT NULL,
  image_url TEXT NOT NULL
);

-- Articles (Knowledge Hub)
CREATE TABLE articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT NOT NULL
);

-- Case Studies (Proven Recovery Results)
CREATE TABLE case_studies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  title TEXT NOT NULL,
  result TEXT NOT NULL,
  metrics TEXT NOT NULL,
  quote TEXT NOT NULL,
  case_id TEXT NOT NULL,
  icon_type TEXT NOT NULL DEFAULT 'trending'
);

-- Enable RLS
ALTER TABLE forensic_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE operational_proofs ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public Read Access Results" ON forensic_results FOR SELECT USING (true);
CREATE POLICY "Public Read Access Proofs" ON operational_proofs FOR SELECT USING (true);
CREATE POLICY "Public Read Access Articles" ON articles FOR SELECT USING (true);
CREATE POLICY "Public Read Access Case Studies" ON case_studies FOR SELECT USING (true);

-- Allow authenticated CRUD for admins
CREATE POLICY "Admin CRUD Access Results" ON forensic_results FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin CRUD Access Proofs" ON operational_proofs FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin CRUD Access Articles" ON articles FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin CRUD Access Case Studies" ON case_studies FOR ALL TO authenticated USING (true);
```

## Storage Buckets

### `public-assets`
Used for hosting all forensic evidence and operational proof images.

- **Bucket Name**: `public-assets`
- **Folders**: 
    - `results/`: Case evidence screenshots.
    - `operational/`: Lab and team photos.
    - `blog/`: Knowledge Hub article cover images.
- **Access Policy**: 
    - `SELECT`: Publicly accessible.
    - `INSERT/UPDATE/DELETE`: Restricted to authenticated administrators.

---
*Last Updated: 11/25/2024*
