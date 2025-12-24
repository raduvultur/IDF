import json
import os

input_file = '/Users/jm5536/Documents/DEV/IDF/datasets.json'
output_file = '/Users/jm5536/.gemini/antigravity/brain/ef3aecd5-d97d-4393-b40d-c7867d49614a/datasets_list.md'

with open(input_file, 'r') as f:
    data = json.load(f)

datasets = data.get('results', [])
total = data.get('total_count', 0)

markdown_content = f"# Ile-de-France Mobilites Datasets\n\n**Total Datasets Available**: {total}\n\n"

for ds in datasets:
    meta = ds.get('metas', {}).get('default', {})
    title = meta.get('title', 'Unknown Title')
    dataset_id = ds.get('dataset_id', 'Unknown ID')
    description = meta.get('description', '')
    records_count = meta.get('records_count', 0)
    
    # Simple cleanup of HTML tags if necessary, but description might be HTML.
    # We'll just leave it as is or do basic strip. 
    # Let's keep it simple for now.
    
    markdown_content += f"## {title}\n"
    markdown_content += f"- **ID**: `{dataset_id}`\n"
    markdown_content += f"- **Records**: {records_count}\n"
    markdown_content += f"- **Description**: {description[:200]}...\n\n" # Truncate description
    markdown_content += "---\n\n"

with open(output_file, 'w') as f:
    f.write(markdown_content)

print(f"Generated {output_file}")
