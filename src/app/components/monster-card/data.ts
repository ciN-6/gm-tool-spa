export const monster = {
    "index": "ettin",
    "name": "Ettin",
    "size": "Large",
    "type": "giant",
    "alignment": "chaotic evil",
    "armor_class": [
        {
            "type": "natural",
            "value": 12
        }
    ],
    "hit_points": 85,
    "hit_dice": "10d10",
    "hit_points_roll": "10d10+30",
    "speed": {
        "walk": "40 ft."
    },
    "strength": 21,
    "dexterity": 8,
    "constitution": 17,
    "intelligence": 6,
    "wisdom": 10,
    "charisma": 8,
    "proficiencies": [
        {
            "value": 4,
            "proficiency": {
                "index": "skill-perception",
                "name": "Skill: Perception",
                "url": "/api/proficiencies/skill-perception"
            }
        }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
        "darkvision": "60 ft.",
        "passive_perception": 14
    },
    "languages": "Giant, Orc",
    "challenge_rating": 4,
    "proficiency_bonus": 2,
    "xp": 1100,
    "special_abilities": [
        {
            "name": "Two Heads",
            "desc": "The ettin has advantage on Wisdom (Perception) checks and on saving throws against being blinded, charmed, deafened, frightened, stunned, and knocked unconscious."
        },
        {
            "name": "Wakeful",
            "desc": "When one of the ettin's heads is asleep, its other head is awake."
        }
    ],
    "actions": [
        {
            "name": "Multiattack",
            "multiattack_type": "actions",
            "desc": "The ettin makes two attacks: one with its battleaxe and one with its morningstar.",
            "actions": [
                {
                    "action_name": "Battleaxe",
                    "count": 1,
                    "type": "melee"
                },
                {
                    "action_name": "Morningstar",
                    "count": 1,
                    "type": "melee"
                }
            ]
        },
        {
            "name": "Battleaxe",
            "desc": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) slashing damage.",
            "attack_bonus": 7,
            "damage": [
                {
                    "damage_type": {
                        "index": "slashing",
                        "name": "Slashing",
                        "url": "/api/damage-types/slashing"
                    },
                    "damage_dice": "2d8+5"
                }
            ],
            "actions": []
        },
        {
            "name": "Morningstar",
            "desc": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) piercing damage.",
            "attack_bonus": 7,
            "damage": [
                {
                    "damage_type": {
                        "index": "piercing",
                        "name": "Piercing",
                        "url": "/api/damage-types/piercing"
                    },
                    "damage_dice": "2d8+5"
                }
            ],
            "actions": []
        }
    ],
    "url": "/api/monsters/ettin",
    "legendary_actions": []
}

export const condition = {
    "count": 15,
    "results": [
        {
            "index": "blinded",
            "name": "Blinded",
            "url": "/api/conditions/blinded"
        },
        {
            "index": "charmed",
            "name": "Charmed",
            "url": "/api/conditions/charmed"
        },
        {
            "index": "deafened",
            "name": "Deafened",
            "url": "/api/conditions/deafened"
        },
        {
            "index": "exhaustion",
            "name": "Exhaustion",
            "url": "/api/conditions/exhaustion"
        },
        {
            "index": "frightened",
            "name": "Frightened",
            "url": "/api/conditions/frightened"
        },
        {
            "index": "grappled",
            "name": "Grappled",
            "url": "/api/conditions/grappled"
        },
        {
            "index": "incapacitated",
            "name": "Incapacitated",
            "url": "/api/conditions/incapacitated"
        },
        {
            "index": "invisible",
            "name": "Invisible",
            "url": "/api/conditions/invisible"
        },
        {
            "index": "paralyzed",
            "name": "Paralyzed",
            "url": "/api/conditions/paralyzed"
        },
        {
            "index": "petrified",
            "name": "Petrified",
            "url": "/api/conditions/petrified"
        },
        {
            "index": "poisoned",
            "name": "Poisoned",
            "url": "/api/conditions/poisoned"
        },
        {
            "index": "prone",
            "name": "Prone",
            "url": "/api/conditions/prone"
        },
        {
            "index": "restrained",
            "name": "Restrained",
            "url": "/api/conditions/restrained"
        },
        {
            "index": "stunned",
            "name": "Stunned",
            "url": "/api/conditions/stunned"
        },
        {
            "index": "unconscious",
            "name": "Unconscious",
            "url": "/api/conditions/unconscious"
        }
    ]
}