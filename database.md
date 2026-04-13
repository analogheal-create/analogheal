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

#### SQL Schema
```sql
CREATE TABLE forensic_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  label TEXT NOT NULL,
  date TEXT NOT NULL,
  forensic_id TEXT,
  image_url TEXT NOT NULL
);

-- Enable RLS
ALTER TABLE forensic_results ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public Read Access" ON forensic_results
  FOR SELECT USING (true);

-- Allow authenticated insert/delete for admins
CREATE POLICY "Admin CRUD Access" ON forensic_results
  FOR ALL TO authenticated USING (true);
```

## Storage Buckets

### `public-assets`
Used for hosting the authenticated forensic evidence images.

- **Bucket Name**: `public-assets`
- **Internal Path**: `results/`
- **Access Policy**: 
    - `SELECT`: Publicly accessible (authenticated for upload).
    - `INSERT/UPDATE/DELETE`: Restricted to authenticated administrators.

---
*Last Updated: ${new Date().toLocaleDateString()}*