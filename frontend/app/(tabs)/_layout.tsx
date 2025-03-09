import { Tabs } from 'expo-router';

export default function Layout(){
    return (
        <Tabs>
            <Tabs.Screen name='home' options={{title: 'Home'}} />
            <Tabs.Screen name='search' options={{title: 'Search'}} />
            <Tabs.Screen name='stats' options={{title: 'Stats'}} />
            <Tabs.Screen name='profile' options={{title: 'Profile'}} />
        </Tabs>
    );
}