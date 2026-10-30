from .models import CarMake, CarModel


def initiate():
    car_make_data = [
        {"name": "NISSAN", "description": "Great cars. Japanese technology"},
        {"name": "Mercedes", "description": "Great cars. German technology"},
        {"name": "Audi", "description": "Great cars. German technology"},
        {"name": "Kia", "description": "Great cars. Korean technology"},
        {"name": "Toyota", "description": "Great cars. Japanese technology"},
    ]

    car_make_instances = []
    for data in car_make_data:
        car_make_instances.append(
            CarMake.objects.create(
                name=data['name'],
                description=data['description']
            )
        )

    nissan, mercedes, audi, kia, toyota = car_make_instances

    # Create CarModel instances with the corresponding CarMake instances
    car_model_data = [
        {"name": "Pathfinder", "type": "SUV", "car_make": nissan},
        {"name": "Qashqai", "type": "SUV", "car_make": nissan},
        {"name": "XTRAIL", "type": "SUV", "car_make": nissan},
        {"name": "A-Class", "type": "SUV", "car_make": mercedes},
        {"name": "C-Class", "type": "SUV", "car_make": mercedes},
        {"name": "E-Class", "type": "SUV", "car_make": mercedes},
        {"name": "A4", "type": "SUV", "car_make": audi},
        {"name": "A5", "type": "SUV", "car_make": audi},
        {"name": "A6", "type": "SUV", "car_make": audi},
        {"name": "Sorrento", "type": "SUV", "car_make": kia},
        {"name": "Carnival", "type": "SUV", "car_make": kia},
        {"name": "Cerato", "type": "Sedan", "car_make": kia},
        {"name": "Corolla", "type": "Sedan", "car_make": toyota},
        {"name": "Camry", "type": "Sedan", "car_make": toyota},
        {"name": "Kluger", "type": "SUV", "car_make": toyota},
        # Add more CarModel instances as needed
    ]

    for data in car_model_data:
        CarModel.objects.create(
            name=data['name'],
            car_make=data['car_make'],
            type=data['type'],
            year=2023
        )
