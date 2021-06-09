import * as THREE from 'three'
import React, { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { useSprings, a } from '@react-spring/three'

const number = 15
const colors = [
  '#187b8f',
  '#1d8ba1',
  '#2c96ab',
  '#36afc7',
  '#52c2d9',
  '#6dd4e8'
]
const random = i => {
  const r = Math.random()
  return {
    position: [100 - Math.random() * 200, 100 - Math.random() * 200, i * 1.5],
    color: colors[Math.round(Math.random() * (colors.length - 1))],
    scale: [1 + r * 14, 1 + r * 14, 1],
    rotation: [0, 0, THREE.Math.degToRad(Math.round(Math.random()) * 45)]
  }
}

const data = new Array(number).fill().map(() => {
  return {
    color: colors[Math.round(Math.random() * (colors.length - 1))],
    args: [0.1 + Math.random() * 9, 0.1 + Math.random() * 9, 10]
  }
})

function Content() {
  const [timerId, setTimerId] = useState(undefined)

  const shuffle = delay => {
    if (timerId) {
      return
    }
    set(i => ({
      ...random(i)
    }))
    setTimerId(
      setTimeout(() => {
        setTimerId(undefined)
      }, delay)
    )
  }

  const [springs, set] = useSprings(number, i => ({
    from: random(i),
    ...random(i),
    config: { mass: 30, tension: 150, friction: 100 }
  }))

  return data.map((d, index) => (
    <a.mesh
      key={index}
      {...springs[index]}
      castShadow
      receiveShadow
      onPointerOver={event => shuffle(650)}
    >
      <boxBufferGeometry attach="geometry" args={d.args} />
      <a.meshStandardMaterial
        attach="material"
        color={springs[index].color}
        roughness={0.75}
        metalness={0.5}
      />
    </a.mesh>
  ))
}

function Lights() {
  return (
    <group>
      <pointLight intensity={0.3} />
      <ambientLight intensity={2.2} />
      <spotLight
        castShadow
        intensity={0.2}
        angle={Math.PI / 7}
        position={[150, 150, 250]}
        penumbra={1}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
    </group>
  )
}

export default function Stacks() {
  return (
    <Canvas linear shadows camera={{ position: [0, 0, 100], fov: 100 }}>
      <Lights />
      <Content />
    </Canvas>
  )
}
