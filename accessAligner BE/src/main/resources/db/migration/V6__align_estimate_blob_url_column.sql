SET @estimate_blob_url_rename = (
    SELECT IF(
        EXISTS (
            SELECT 1
            FROM information_schema.columns
            WHERE table_schema = DATABASE()
              AND table_name = 'estimate'
              AND column_name = 'blobURL'
        )
        AND NOT EXISTS (
            SELECT 1
            FROM information_schema.columns
            WHERE table_schema = DATABASE()
              AND table_name = 'estimate'
              AND column_name = 'blob_url'
        ),
        'ALTER TABLE estimate RENAME COLUMN `blobURL` TO `blob_url`',
        'DO 0'
    )
);

PREPARE estimate_blob_url_statement FROM @estimate_blob_url_rename;
EXECUTE estimate_blob_url_statement;
DEALLOCATE PREPARE estimate_blob_url_statement;
