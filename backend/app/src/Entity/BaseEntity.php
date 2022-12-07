<?php

namespace App\Entity;

use App\Traits\Hydrator;
use ReflectionClass;

abstract class BaseEntity
{
    use Hydrator;

    public function __construct(array $data = [])
    {
       $this->hydrate($data);
    }

    public function dataToArray()
    {
        $data = [];

        $reflection = new ReflectionClass($this);

        $properties = $reflection->getProperties();

        foreach ($properties as $property) {

            $property->setAccessible(true);

            $data[$property->getName()] = $property->getValue($this);
        }

        return $data;
    }
}

