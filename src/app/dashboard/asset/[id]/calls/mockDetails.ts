export const mockEquipmentData = {
  "id": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
  "serial_number": "SN001",
  "part_number": null,
  "equipment_template_id": null,
  "name": "Equipo Padre X",
  "main_equipment": true,
  "children": [
    {
      "id": "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
      "serial_number": "SN002",
      "part_number": "",
      "equipment_template_id": "e5a3aeca-d465-45b8-a973-ed3fb538dc82",
      "name": "Equipo Hijo Y",
      "main_equipment": false,
      "level": 1,
      "children": [
        {
          "id": "37e23092-e94c-423a-b3c2-f11ace08d84c",
          "serial_number": "123456",
          "part_number": "10035251",
          "equipment_template_id": "e5a3aeca-d465-45b8-a973-ed3fb538dc82",
          "name": "OTK VBV",
          "main_equipment": true,
          "level": 1,
          "children": []
        },
        {
          "id": "cccccccc-cccc-cccc-cccc-cccccccccccc",
          "serial_number": "SN003",
          "part_number": null,
          "equipment_template_id": null,
          "name": "Equipo Nieto Z",
          "main_equipment": false,
          "level": 1,
          "children": []
        }
      ]
    },
    {
      "id": "dddddddd-dddd-dddd-dddd-dddddddddddd",
      "serial_number": "SN004",
      "part_number": "20045362",
      "equipment_template_id": "f6b4bfdb-e576-56c9-b084-fe4gc649ed93",
      "name": "Equipo Hijo Z",
      "main_equipment": false,
      "level": 1,
      "children": [
        {
          "id": "eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee",
          "serial_number": "SN005",
          "part_number": "30056473",
          "equipment_template_id": "g7c5c0ec-f687-67da-c195-0f5hd75aef04",
          "name": "Sub-equipo A",
          "main_equipment": false,
          "level": 2,
          "children": [
            {
              "id": "ffffffff-ffff-ffff-ffff-ffffffffffff",
              "serial_number": "SN006",
              "part_number": "40067584",
              "equipment_template_id": "h8d6d1fd-0798-78eb-d2a6-106ie86bf115",
              "name": "Componente Final",
              "main_equipment": false,
              "level": 3,
              "children": []
            }
          ]
        }
      ]
    }
  ]
};
