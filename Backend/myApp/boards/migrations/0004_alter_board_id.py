# Generated by Django 5.0.2 on 2024-11-15 20:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('boards', '0003_boardinvitation'),
    ]

    operations = [
        migrations.AlterField(
            model_name='board',
            name='id',
            field=models.BigAutoField(primary_key=True, serialize=False),
        ),
    ]
